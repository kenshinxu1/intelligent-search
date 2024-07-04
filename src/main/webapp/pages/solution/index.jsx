import React from 'react';
import layout from '@splunk/react-page';
import Solutionguidance from './solutionguidance';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
import {GlobalStyles, StyledContainer, StyledGreeting} from '../../common/StartStyles';


layout(
    <SplunkThemeProvider family="prisma" colorScheme="dark" density="compact">
        <GlobalStyles />
            <StyledContainer colorScheme="dark" density="compact">
            <StyledGreeting>Intelligent Search</StyledGreeting>
                <Solutionguidance name="from inside Solution Guidance" />
            </StyledContainer>
    </SplunkThemeProvider>
);
