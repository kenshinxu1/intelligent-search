import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@splunk/react-ui/Button';
import P from '@splunk/react-ui/Paragraph';
import TabLayout from '@splunk/react-ui/TabLayout';
import Divider from '@splunk/react-ui/Divider';
import Text from '@splunk/react-ui/Text';
import RobotFace from '@splunk/react-icons/enterprise/Search';
import LayersTriple from '@splunk/react-icons/enterprise/List';
import Star from '@splunk/react-icons/enterprise/Star';
import BookOpen from '@splunk/react-icons/enterprise/User';
import Wrench from '@splunk/react-icons/enterprise/Tool';
import ChartPie from '@splunk/react-icons/enterprise/ChartPie';
import Paginator from '@splunk/react-ui/Paginator';
import ControlGroup from '@splunk/react-ui/ControlGroup';
import Card from '@splunk/react-ui/Card';
import Heading from '@splunk/react-ui/Heading';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import {defaultFetchInit, handleError, handleResponse} from '@splunk/splunk-utils/fetch';
import SearchJob from '@splunk/search-job';
import WaitSpinner from '@splunk/react-ui/WaitSpinner';
import Magnifier from '@splunk/react-icons/Magnifier';
import styled  from "styled-components";


import {
    ai_apps,
    APP_CATEGORY_URL,
    APP_SEARCH_URL,
    guide_apps1,
    guide_apps2,
    guide_apps3,
    tools_apps,
    visual_apps
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
                            .catch(handleError(('Failed to get solution')))
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
        const iconProps = { width: 20, height: 20 };
        const style = { width: 350, height: 350, margin: '0 20px 20px 0' };
        const colStyle = { background: "${variables.backgroundColorPage}", minHeight: "100px"};
        const { name } = this.props;
        const { counter,
                search,
                activeTabId,
                app_results,
                app_solution,
                searching
        } = this.state;
        const StyledGroup = styled.div`
            max-width: 1200px;
        `;


        return (
            <TabLayout defaultActivePanelId="digger" iconSize="large" layout="vertical">
                <TabLayout.Panel label="Top Wanted Apps" panelId="digger" icon={<LayersTriple variant="filled"/>}>
                    <TabLayout defaultActivePanelId="learner" iconSize="large" >
                        <TabLayout.Panel label="Beginner" panelId="learner" icon={<BookOpen variant="filled"/>}>
                            <div style={{margin: 20}}>
                                <Heading level={1} style={{color: "#f0581f"}}>SPL - from Beginner to Master</Heading>
                                <Divider />
                                <P><AppPanel cardList={guide_apps1} open={true} tab={400}/></P>
                            </div>
                            <div style={{margin: 20}}>
                                <Heading level={1} style={{color: "#f0581f"}}>Everything you need to know to build a dashboard !</Heading>
                                <Divider />
                                <P><AppPanel cardList={guide_apps2} open={true} tab={300}/></P>
                            </div>
                            <div style={{margin: 20}}>
                                <Heading level={1} style={{color: "#f0581f"}}>Out of box Essential Use Cases !</Heading>
                                <Divider />
                                <P><AppPanel cardList={guide_apps3} open={true}/></P>
                            </div>
                        </TabLayout.Panel>
                        <TabLayout.Panel label="Admin Tools" panelId="utility" icon={<Wrench variant="filled"/>}>
                            <div style={{margin: 20}}>
                                <Heading level={1} style={{color: "#f0581f"}}>Advanced tools to make your life easier !</Heading>
                                <Divider />
                                <PremiumPanel cardList={tools_apps} tab={400}/>
                            </div>
                        </TabLayout.Panel>
                        <TabLayout.Panel label="Visualizations" panelId="visual" icon={<ChartPie variant="filled"/>}>
                            <div style={{margin: 20}}>
                                <Heading level={1} style={{color: "#f0581f"}}>Make your Dashboards look more amazing !</Heading>
                                <Divider />
                                <P><AppPanel cardList={visual_apps} open={true}/></P>
                            </div>
                        </TabLayout.Panel>
                        <TabLayout.Panel label="Splunk AI" panelId="search" icon={<Star variant="filled"/>}>
                            <PremiumPanel cardList={ai_apps} tab={900}/>
                        </TabLayout.Panel>
                    </TabLayout>
                </TabLayout.Panel>
                <TabLayout.Panel label="Intelligent Search" panelId="search" icon={<RobotFace variant="filled"/>}>
                    <div style={{margin: 40}}>
                        <ControlGroup
                            label={'App Search'}
                            controlsLayout="none"
                            size="medium"
                        >
                            <ColumnLayout>
                                <ColumnLayout.Row>
                                    <ColumnLayout.Column span={20} style={colStyle}>
                                        <Text multiline
                                                  value={this.state.value}
                                                  placeholder="Please enter the assistance you seek through Splunk apps.."
                                                  onChange={this.handleSearchChange}
                                                  style={{height: '100px'}}
                                        />
                                    </ColumnLayout.Column>
                                    <ColumnLayout.Column span={4} style={colStyle}>
                                        <Button
                                            label="search"
                                            inline
                                            appearance="primary"
                                            size="big"
                                            onClick={this.handleSearch}
                                            disabled={searching}
                                            icon={<Magnifier />}
                                        />
                                    </ColumnLayout.Column>
                                </ColumnLayout.Row>
                            </ColumnLayout>
                        </ControlGroup>
                    </div>
                    <div style={{margin: 40}}>
                        <ControlGroup
                            label={'Result:'}
                            controlsLayout="none"
                            style={{ width: '900px'}}
                        >
                            {
                                searching ? (<WaitSpinner size="large"/>) : app_solution ? (
                                    <Card style={style}
                                          to={app_solution.installed ? null : app_solution.path} openInNewContext>
                                        <Card.Header title={app_solution.title} truncateTitle={false}
                                                     subtitle={`Download Count:${app_solution.download_count} ${app_solution.installed ? "   Already installed" : ""}`}/>
                                        <Card.Body>
                                            <img src={app_solution.icon} alt="empty" style={{
                                                height: 150,
                                                width: 150,
                                                display: 'block',
                                                margin: '0 auto'

                                            }}/>
                                        </Card.Body>
                                    </Card>) : null
                            }
                        </ControlGroup>
                    </div>
                    <div style={{margin: 40}}>
                        <ControlGroup
                            label={'Others References'}
                            controlsLayout="none"
                            style={{ width: '1200px'}}
                            // style={StyledGroup}
                        >
                            <AppPanel cardList={app_results} tab={200}/>
                            {app_results && app_results.length > 6 ? (<Paginator
                                onChange={this.handlePageChange}
                                current={this.state.page}
                                alwaysShowLastPageLink
                                totalPages={3}
                            />) : null}
                        </ControlGroup>
                    </div>
                </TabLayout.Panel>
            </TabLayout>
        );
    }
}

export default Solutionguidance;
