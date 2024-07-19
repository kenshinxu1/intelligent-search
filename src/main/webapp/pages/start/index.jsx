import React from 'react';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
import styled from 'styled-components';
import {mixins, pick, variables} from '@splunk/themes';
import Divider from '@splunk/react-ui/Divider';
import Heading from '@splunk/react-ui/Heading';
import P from '@splunk/react-ui/Paragraph';
import DL from '@splunk/react-ui/DefinitionList';
import Card from '@splunk/react-ui/Card';
import List from '@splunk/react-ui/List';
import layout from '@splunk/react-page';
import {GlobalStyles, StyledContainer, StyledGreeting} from '../../common/StartStyles';
import pic from '../../static/background.png';
import bg from '../../static/backgroundnetwork.jpg';
import bgAI from '../../static/backgroundAI.png';

const StyledDivider = styled(Divider)`
    border-color: #f65810;
    margin-bottom: ${variables.spacingLarge};
    margin-top: ${variables.spacingLarge};
`;

const Wrapper = styled.div`
    ${mixins.reset()};

    color: ${pick({
    enterprise: variables.textColor,
    prisma: variables.contentColorDefault
})};
`;

const cardStyle = {
    width: "80%",
    backgroundColor: "black"
};

layout(
    <SplunkThemeProvider family="prisma" colorScheme="dark" density="compact">
        <div style={{
            backgroundSize: '100% , 150%',
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left top'
        }}>
            <GlobalStyles/>
            <StyledContainer colorScheme="dark" density="compact">
                <StyledGreeting>Welcome to Intelligent Searcher</StyledGreeting>
                <StyledDivider/>
                <div style={{margin: 20 }}>
                    <Card style={cardStyle} showBorder={false}>
                        <Card.Body>
                            <div style={{width:"100%", height: "100%"}}>
                                <img src={bgAI} alt="empty" style={{
                                    height: "100%",
                                    width: "100%",
                                    display: 'block',
                                    margin: '0'

                                }}/>
                            </div>
                        </Card.Body>
                    </Card>
                    <Heading colorScheme="dark" level={1}>Overview</Heading>
                    <Card style={cardStyle} showBorder={false}>
                        <Card.Body>
                            <P>This App is designed to be an intelligent Splunk App Searcher that leverages Splunk AI
                                capability to automatically suggest the appropriate Splunk app from Splunkbase based on
                                the text description of the business requirements entered by the user.

                                By leveraging machine learning toolkit, the customer could directly search by their
                                problems/requirements instead of just searching by technology/keywords.

                                This App also supports search with multi language to help Customers all around the
                                world.
                            </P>
                            <p>
                                <Heading level={4}>
                                    <u>Preconditions:</u>
                                </Heading>
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
                                <DL.Description>Simply search by the description of requirement and problem you have,
                                    then check App in Intelligent Recommendation part, you'll got what you
                                    want!!!</DL.Description>
                                <DL.Term>Search with multi Language</DL.Term>
                                <DL.Description>Directly search with Japanese/Chinese/Korean...etc and get result!!!</DL.Description>
                                <Heading level={3}><u>New Collections</u></Heading>
                                <DL.Term>Beginner</DL.Term>
                                <DL.Description>Collection of Splunk learning Apps(** Example) to help customers better
                                    understand how to use Splunk</DL.Description>
                                <DL.Term>Admin Tools</DL.Term>
                                <DL.Description>Collection of those tools (like lookup editor/config Explorer) that are
                                    widely used to improve the efficiency of Splunk Administration.</DL.Description>
                                <DL.Term>Visualizations</DL.Term>
                                <DL.Description>Collection of Visualization like Chart Types/Maps.</DL.Description>
                            </DL>
                        </Card.Body>
                    </Card>
                </div>
            </StyledContainer>
        </div>
    </SplunkThemeProvider>

)
;
