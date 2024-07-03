import React, { Component } from 'react';
import CardLayout from '@splunk/react-ui/CardLayout';
import Card from '@splunk/react-ui/Card';
import PropTypes from 'prop-types';
import { find, map } from 'lodash';
import Link from '@splunk/react-ui/Link';



AppPanel.propTypes = {
    cardList: PropTypes.array,
    tab:PropTypes.string
};

function AppPanel(props) {
    const cardContentStyle = {
        height: 80,
        background: '#eee',
        align:'bottom',
        bottom: 0
    };
    const imgStyle = {
        background: '#000000',
        display: 'block',
        margin: '0 auto',
        align:'center',
        verticalAlign: 'bottom',
        objectFit:'fill'
    };
    const { cardList, tab} = props;
    return (
        <CardLayout cardWidth={200}  wrapCards={true} style={{maxWidth: 900}}>

            {
                map(cardList, card => {

                    return  <Card to={card.path} openInNewContext>
                              <Card.Header title={card.title} truncateTitle={false} subtitle={`Download Count:${card.download_count}`} />
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
