import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@splunk/react-ui/Button';
import P from '@splunk/react-ui/Paragraph';
import TabLayout from '@splunk/react-ui/TabLayout';
import Text from '@splunk/react-ui/Text';
import RobotFace from '@splunk/react-icons/RobotFace';
import LayersTriple from '@splunk/react-icons/LayersTriple';
import Star from '@splunk/react-icons/Star';
import BookOpen from '@splunk/react-icons/BookOpen';
import Wrench from '@splunk/react-icons/Wrench';
import ChartPie from '@splunk/react-icons/ChartPie';
import Paginator from '@splunk/react-ui/Paginator';
import ControlGroup from '@splunk/react-ui/ControlGroup';
import Card from '@splunk/react-ui/Card';
import Heading from '@splunk/react-ui/Heading';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import {defaultFetchInit, handleError, handleResponse} from '@splunk/splunk-utils/fetch';
import SearchJob from '@splunk/search-job';
import WaitSpinner from '@splunk/react-ui/WaitSpinner';


import {
    APP_CATEGORY_URL,
    APP_SEARCH_URL,
    epic_apps,
    guide_apps1,
    guide_apps2,
    guide_apps3
} from '../../common/constants';
import {createURL, getPredictSPL} from '../../common/util';
import AppPanel from '../../common/AppPanel';
import PremiumPanel from '../../common/PremiumPanel';


class Solutionguidance extends Component {
    static propTypes = {
        name: PropTypes.string,
    };

    static defaultProps = {
        name: 'User',
    };

    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            search: '',
            activeTabId: 'search',
            page: 1,
            app_results:[],
            app_solution: null,
            searching: false,
            rightOpen: false,

        };
    }

    handleTabChange = (e, data) => {
        this.setState({ activeTabId: data.selectedTabId });
    };


    handleSearchChange = (e, { value }) => {
        this.setState({ search:value });
    };

    handlePageChange = (e, { page }) => {
        this.setState({ page });
    };

    handleSearch = () => {
        console.log("start search")
        console.log(createURL(APP_SEARCH_URL))
        console.log(createURL(APP_CATEGORY_URL))
        const query =  this.state.search;
        console.log(query);
        console.log(getPredictSPL(query));
        this.setState({
            app_results:[],
            app_solution: null});
        const options = {
            ...defaultFetchInit
        };

        const param = {
            offset: 0,
            limit:10,
            query: query,
            order: 'relevance',
            include: "release,categories,created_by,icon,download_count",

        }

        this.setState({searching:true});
        this.handlePredict(query);
        fetch(createURL(APP_SEARCH_URL,param))
            .then(handleResponse(200))
            .then((data) => {
                console.log(data.results);
                this.setState({app_results: data.results})
            })
            .catch(handleError(_('Failed to get APP result')))
            .catch(error => {
                    console.log(error);
                }
            );

    };


    handlePredict = (query) => {
        // Generate sql and get predicted result
        SearchJob.create(
            {
                search: getPredictSPL(query),
                earliest_time: 0,
                latest_time: 'now',
            },
            {
                app: 'intelligent-search',
                owner: 'admin'
            }
        )
            .getResults({ count: 0 })
            .subscribe({
                next: response => {
                    console.log(response);
                    let solution;
                    if (response.results && response.results.length >0) {
                        solution = response.results[0]['app_name'];
                        console.log(solution)
                    }
                    if (solution) {
                        const param = {
                            offset: 0,
                            limit: 1,
                            query: solution,
                            order: 'relevance',
                            include: "release,categories,created_by,icon,download_count",
                        }
                        fetch(createURL(APP_SEARCH_URL, param))
                            .then(handleResponse(200))
                            .then((data) => {
                                console.log(data.results);
                                let recommand_app = {};
                                if (!data.results || data.results.length == 0) {
                                    recommand_app = {title: solution,installed:true , icon:"https://cdn.apps.splunk.com/media/public/icons/17c63348-5a1c-11e8-8752-02f13bdc2585.png"}
                                }else if (data.results[0].title != solution){
                                    recommand_app = data.results[0]
                                    recommand_app.title = solution;
                                    recommand_app.installed = true;
                                }else{
                                    recommand_app = data.results[0]
                                }
                                console.log(data.results);
                                this.setState({app_solution: recommand_app,searching:false})
                            })
                            .catch(handleError(_('Failed to get solution')))
                            .catch(error => {
                                console.log(error);
                                this.setState({searching:false});
                            });
                    }
                },
                error: err => {
                    console.log(err);
                    this.setState({searching:false});
                },
                complete: () => {
                    console.log('search Done');
                    this.setState({searching:false});
                },
            });
    };

    openRightPanel = () => {
        this.handleRequestOpen('rightOpen');
    };

    handleRequestOpen = dockPosition => {
        this.setState({rightOpen:true});
    };

    render() {
        const style = { width: 300, height: 300, margin: '0 20px 20px 0' };
        const colStyle = { background: '#ffffff',  minHeight: 80 };
        const { name } = this.props;
        const { counter,
                search,
                activeTabId,
                app_results,
                app_solution,
                searching
        } = this.state;

        const message =
            counter === 0
                ? 'You should try clicking the button.'
                : `You've clicked the button ${counter} time${counter > 1 ? 's' : ''}.`;

        return (

            <TabLayout defaultActivePanelId="search" iconSize="large" layout="vertical">
                <TabLayout.Panel label="Intelligent Search" panelId="search" icon={<RobotFace variant="filled"/>}>
                    <ControlGroup
                        label={'App Search'}
                        controlsLayout="none"
                    >
                        <ColumnLayout>
                            <ColumnLayout.Row>
                                <ColumnLayout.Column span={20} style={colStyle}>
                                    <Text multiline
                                          value={this.state.value}
                                          placeholder="Please describe the problem you want to solve.."
                                          onChange={this.handleSearchChange} />
                                </ColumnLayout.Column>
                                <ColumnLayout.Column span={4} style={colStyle}>
                                    <Button
                                        label="search"
                                        inline
                                        appearance="primary"
                                        size="medium"
                                        onClick={this.handleSearch}
                                        disabled={searching}
                                    />
                                </ColumnLayout.Column>
                            </ColumnLayout.Row>
                        </ColumnLayout>

                    </ControlGroup>
                    <ControlGroup
                        label={'Result:'}
                        controlsLayout="none"
                        style={{ width: '1500px' }}
                    >
                        {

                            searching?(<WaitSpinner size="large" />):app_solution?(
                                <Card style={style}
                                      to={ app_solution.installed?null:app_solution.path} openInNewContext>
                                <Card.Header title={app_solution.title} truncateTitle={false}
                                             subtitle={`Download Count:${app_solution.download_count} ${app_solution.installed?"   Already installed":""}`}/>
                                <Card.Body>
                                    <img src={app_solution.icon} alt="empty" style={{
                                        height: 150,
                                        width: 150,
                                        display: 'block',
                                        margin: '0 auto'

                                    }}/>
                                </Card.Body>
                            </Card>): null
                        }
                    </ControlGroup>
                    <ControlGroup
                        label={'Others References'}
                        controlsLayout="none"
                        style={{ width: '1500px' }}
                    >
                        <AppPanel cardList={app_results}/>
                        {app_results && app_results.length > 0?(<Paginator
                            onChange={this.handlePageChange}
                            current={this.state.page}
                            alwaysShowLastPageLink
                            totalPages={8}
                        />):null}
                   </ControlGroup>
                </TabLayout.Panel>
                <TabLayout.Panel label="Collections" panelId="digger" icon={<LayersTriple variant="filled"/>}>
                    <TabLayout defaultActivePanelId="learner" iconSize="large" >
                        <TabLayout.Panel label="Splunk Learner" panelId="learner" icon={<BookOpen variant="filled"/>}>
                            <div>
                                <Heading level={1}>Solution Implementation</Heading>
                                <P><AppPanel cardList={guide_apps1} open={true}/></P>
                                <Heading level={1}>Features</Heading>
                                <P><AppPanel cardList={guide_apps2} open={true}/></P>
                                <Heading level={1}>Domain</Heading>
                                <P><AppPanel cardList={guide_apps3} open={true}/></P>
                            </div>
                        </TabLayout.Panel>
                        <TabLayout.Panel label="Advanced Tools" panelId="utility" icon={<Wrench variant="filled"/>}>
                            <div>
                                <Heading level={1}>Solution Implementation</Heading>
                                <P><AppPanel cardList={guide_apps1} open={true}/></P>
                                <Heading level={1}>Features</Heading>
                                <P><AppPanel cardList={guide_apps2} open={true}/></P>
                                <Heading level={1}>Domain</Heading>
                                <P><AppPanel cardList={guide_apps3} open={true}/></P>
                            </div>
                        </TabLayout.Panel>
                        <TabLayout.Panel label="Visualizations" panelId="visual" icon={<ChartPie variant="filled"/>}>
                            <div style={{margin: 20}}>
                                <Heading level={1}>Solution Implementation</Heading>
                                <P><AppPanel cardList={guide_apps1} open={true}/></P>
                                <Heading level={1}>Features</Heading>
                                <P><AppPanel cardList={guide_apps2} open={true}/></P>
                                <Heading level={1}>Domain</Heading>
                                <P><AppPanel cardList={guide_apps3} open={true}/></P>
                            </div>
                        </TabLayout.Panel>
                        <TabLayout.Panel label="Preuium Solution" panelId="search" icon={<Star variant="filled"/>}>
                            <PremiumPanel cardList={epic_apps}/>
                        </TabLayout.Panel>
                    </TabLayout>
                </TabLayout.Panel>
                {/*<TabLayout.Panel*/}
                {/*    label="Utilities"*/}
                {/*    panelId="tools"*/}
                {/*    icon={<ExternalViz/>}*/}
                {/*    style={{margin: 20}}*/}
                {/*>*/}
                {/*    <Multiselect values={['1','2','3','4','5','6','7','8']} onChange={this.handleChange} inline>*/}
                {/*        <Multiselect.Option label="Cloud Connect" value="1" />*/}
                {/*        <Multiselect.Option label="Network Toolkit" value="2" />*/}
                {/*        <Multiselect.Option label="Alert Customization" value="3" />*/}
                {/*        <Multiselect.Option label="Database" value="4" />*/}
                {/*        <Multiselect.Option label="SAML Auth" value="5" />*/}
                {/*        <Multiselect.Option label="Sensor Connect" value="6" />*/}
                {/*        <Multiselect.Option label="Cluster Monitoring" value="7" />*/}
                {/*        <Multiselect.Option label="Visualization" value="8" />*/}
                {/*    </Multiselect>*/}
                {/*    <AppPanel cardList={tools_apps}/>*/}
                {/*</TabLayout.Panel>*/}
                {/*<TabLayout.Panel*/}
                {/*    label="Guide"*/}
                {/*    panelId="guide"*/}
                {/*    icon={<ReportSearch />}*/}
                {/*    style={{ margin: 20 }}*/}
                {/*>*/}
                {/*    <div>*/}
                {/*        <Heading level={1}>Solution Implementation</Heading>*/}
                {/*        <P><AppPanel cardList={guide_apps1} open={true}/></P>*/}
                {/*        <Heading level={1}>Features</Heading>*/}
                {/*        <P><AppPanel cardList={guide_apps2} open={true}/></P>*/}
                {/*        <Heading level={1}>Domain</Heading>*/}
                {/*        <P><AppPanel cardList={guide_apps3} open={true}/></P>*/}
                {/*    </div>*/}

                {/*</TabLayout.Panel>*/}
                {/*<TabLayout.Panel*/}
                {/*    label="High Tech"*/}
                {/*    panelId="tech"*/}
                {/*    icon={<LightBulb />}*/}
                {/*    style={{ margin: 20 }}*/}
                {/*>*/}
                {/*    <AppPanel cardList={ht_apps}/>*/}
                {/*</TabLayout.Panel>*/}
            </TabLayout>
        );
    }
}

export default Solutionguidance;
