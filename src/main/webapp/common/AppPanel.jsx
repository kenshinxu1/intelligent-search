import React from 'react';
import CardLayout from '@splunk/react-ui/CardLayout';
import Card from '@splunk/react-ui/Card';
import PropTypes from 'prop-types';
import {map} from 'lodash';


AppPanel.propTypes = {
    cardList: PropTypes.array,
    tab:PropTypes.number
};

function AppPanel(props) {
    const imgStyle = {
        background: '#000000',
        display: 'block',
        margin: '0 auto',
        width: "45%",
        height: "85%",
        align:'center',
        verticalAlign: 'bottom',
        objectFit:'fill'
    };
    const { cardList, tab } = props;
    return (
        <CardLayout cardWidth={tab?tab:250}  wrapCards={true} style={{maxWidth: 1500}}>
            {
                map(cardList, card => {
                    return  <Card to={card.app_url} openInNewContext>
                              <Card.Header title={card.title?card.title:card.app_name} truncateTitle={false} subtitle={`Download Count:${card.download_count}`} />
                                <Card.Body>
                                    <img src={card.icon} alt="empty" style={imgStyle}/>
                                </Card.Body>
                            </Card>
                })
            }
        </CardLayout>
    );
}

export default AppPanel;
