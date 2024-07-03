import React from 'react';
import {ThemeProvider} from 'styled-components';

import layout from '@splunk/react-page';
import MyPage from 'pages/MyPage';
// import {themes as reactUiThemes} from '@splunk/react-ui/themes';
import {defaultTheme} from '@splunk/splunk-utils/themes';

import Solutionguidance from './solutionguidance';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
// import {themes as componentThemes} from '@splunk/solutionguidance/themes';
import {themes as appThemes} from '../../common/themes';
import {StyledContainer, StyledGreeting} from '../../common/StartStyles';

// const themeName = defaultTheme();
// const theme = {
//     ...appThemes[themeName],
//     // ...componentThemes[themeName],
//     ...reactUiThemes[themeName],
// };

layout(
    <SplunkThemeProvider >
        <StyledContainer>
            <StyledGreeting>Intelligent Search</StyledGreeting>
            <Solutionguidance name="from inside Solution Guidance" />
        </StyledContainer>
    </SplunkThemeProvider>
);
