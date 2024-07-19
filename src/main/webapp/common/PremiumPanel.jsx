import React from 'react';
import CardLayout from '@splunk/react-ui/CardLayout';
import Card from '@splunk/react-ui/Card';
import Link from '@splunk/react-ui/Link';
import PropTypes from 'prop-types';
import {map} from 'lodash';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';


AppPanel.propTypes = {
    cardList: PropTypes.array,
    tab:PropTypes.number
};

function AppPanel(props) {
    const cardContentStyle = {
        height: 350,
        background: '#000000',
        align:'top',
        top: 0
    };
    const imgStyle = {
        background: '#000000',
        display: 'inline-block',
        height: 70,
        width: 70,
        // margin: '0 auto',
        align:'left',
    };
    const colStyle = {  padding: 10, Height: 30 };
    const { cardList, tab} = props;
    return (
        <CardLayout cardWidth={tab?tab:700} cardHeight={300} wrapCards={true} style={{maxWidth: 900}}>

            {
                map(cardList, card => {

                    return  <Card to={card.path} openInNewContext>
                              <Card.Header title={card.app_name} truncateTitle={false} subtitle={`Download Count:${card.download_count}`} />
                                <Card.Body style={cardContentStyle}>
                                    <div>{card.description}</div>
                                </Card.Body>
                                <Card.Footer>
                                    <ColumnLayout>
                                    <ColumnLayout.Row>
                                        <ColumnLayout.Column style={colStyle} span={2}>
                                            <img src={card.icon} alt="empty" style={imgStyle}/>
                                        </ColumnLayout.Column>
                                        <ColumnLayout.Column style={colStyle} span={5}>
                                            Released:{card.published_time}.
                                        </ColumnLayout.Column>
                                        <ColumnLayout.Column style={colStyle} span={5}>
                                            <Link to={card.path} openInNewContext>
                                                View on Splunkbase.
                                            </Link>
                                        </ColumnLayout.Column>
                                    </ColumnLayout.Row>
                                    </ColumnLayout>
                                </Card.Footer>
                            </Card>
                })
            }

        </CardLayout>
    );
}

export default AppPanel;
