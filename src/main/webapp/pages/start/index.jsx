import React from 'react';
import {render} from 'react-dom';
import {ThemeProvider} from 'styled-components';
import Heading from '@splunk/react-ui/Heading';
import P from '@splunk/react-ui/Paragraph';
import DL from '@splunk/react-ui/DefinitionList';
import Card from '@splunk/react-ui/Card';
import List from '@splunk/react-ui/List';
import layout from '@splunk/react-page';
// import {themes as reactUiThemes} from '@splunk/react-ui/themes';
import {defaultTheme} from '@splunk/splunk-utils/themes';
// import {themes as componentThemes} from '@splunk/solutionguidance/themes';
import {themes as appThemes} from '../../common/themes';
import {StyledContainer, StyledGreeting} from '../../common/StartStyles';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';

const themeName = defaultTheme();
// const theme = {
//     ...appThemes[themeName],
//     ...componentThemes[themeName],
//     ...reactUiThemes[themeName],
// };

const cardStyle = { width: 800};
layout(
    <SplunkThemeProvider colorScheme="light">
            <StyledContainer>
                <StyledGreeting>Welcome to Intelligent Searcher</StyledGreeting>
                <div>
                    <Card style={cardStyle} showBorder={false}>
                        <Card.Body>
                            <div>
                                <img src="https://4.bp.blogspot.com/-_8--HP4MXXg/VwhNgkklfII/AAAAAAAABlY/EMT4FbIxyKA7i3LlWLQT9A7BZuxYKzw3A/s1600/Define%2Bthe%2Bconcept%2BGuidance%2Bin%2Bdetail.jpg" alt="empty" style={{
                                    height: 250,
                                    width: 700,
                                    display: 'block',
                                    margin: '20'

                                }}/>
                            </div>
                        </Card.Body>
                    </Card>
                    <Heading  colorScheme="light" level={1}>Overview</Heading>
                    <Card style={cardStyle} showBorder={false}>
                        <Card.Body>
                            <P>This App is designed to be an intelligent Splunk App Searcher that leverages Splunk AI capability to automatically suggest the appropriate Splunk app from Splunkbase based on the text description of the business requirements entered by the user.

                                By leveraging machine learning toolkit, the customer could directly search by their problems/requirements instead of just searching by technology/keywords.

                                This App also supports search with multi language to help Customers all around the world.
                            </P>
                            <p>
                                <u>Preconditions:</u>
                                <List>
                                    <List.Item>Splunk ML Toolkit</List.Item>
                                    <List.Item>Python for Scientific Computing </List.Item>
                                    <List.Item>Access to Public Network</List.Item>
                                </List>

                            </p>
                        </Card.Body>
                    </Card>

                    <Heading level={1}> New Approaches to find the right App</Heading>
                    <Card style={cardStyle} showBorder={false}>
                        <Card.Body>
                            <DL termWidth={180}>
                                <DL.Term>Intelligent Search</DL.Term>
                                <DL.Description>Simply search by the description of requirement and problem you have, then check App in Intelligent Recommendation part, you'll got what you want!!!</DL.Description>
                                <DL.Term>Search with your own Language</DL.Term>
                                <DL.Description>Just simpled enter the search criteria in your own language and get result directly!!!</DL.Description>
                                <Heading  colorScheme="light" level={2}>New Collections</Heading>
                                <DL.Term>Splunk Learner</DL.Term>
                                <DL.Description>Collection of Splunk learning Apps(** Example) to help customers better understand how to use Splunk</DL.Description>
                                <DL.Term>Admin Utilities</DL.Term>
                                <DL.Description>Collection of those tools (like lookup editor/config Explorer) that are widely used to improve the efficiency of Splunk Administration.</DL.Description>
                                <DL.Term>Visualizations</DL.Term>
                                <DL.Description>Collection of Visualization like Chart Types/Maps.</DL.Description>
                            </DL>
                        </Card.Body>
                    </Card>
                </div>
            </StyledContainer>
    </SplunkThemeProvider>
);
