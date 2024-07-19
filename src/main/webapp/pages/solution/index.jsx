import React from 'react';
import layout from '@splunk/react-page';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
import {GlobalStyles, StyledContainer, StyledGreeting} from '../../common/StartStyles';
import {variables} from '@splunk/themes';
import Divider from '@splunk/react-ui/Divider';
import styled from 'styled-components';
import bg from "../../static/backgroundblue.png";
import Solutionguidance from './solutionguidance';

const StyledDivider = styled(Divider)`
    border-color: #f65810;
    margin-bottom: ${variables.spacingLarge};
    margin-top: ${variables.spacingLarge};
`;

layout(
    <SplunkThemeProvider family="prisma" colorScheme="dark" density="comfortable">
        <GlobalStyles/>
        <div style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left top',
        }}>
            <StyledContainer colorScheme="dark" density="comfortable">
                <StyledGreeting>Intelligent Search</StyledGreeting>
                <StyledDivider/>
                <Solutionguidance name="from inside Solution Guidance"/>
            </StyledContainer>
        </div>
    </SplunkThemeProvider>
);
