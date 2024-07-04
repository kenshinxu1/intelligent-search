import styled from 'styled-components';
import { createGlobalStyle } from "styled-components";
import { variables } from "@splunk/themes";


const StyledContainer = styled.div`
    display: block;
    font-size: medium;
    line-height: 200%;
    margin: 20px;
`;

const StyledGreeting = styled.div`
    font-weight: bold;
    color: white;
    font-size: xx-large;
    margin: auto;
`;
const StyledTitle = styled.div`
    font-weight: bold;
    color: #f0581f;
    font-size: xx-large;
    margin: auto;
`;

const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${variables.backgroundColorPage};
    }
`;

export { StyledContainer, StyledGreeting ,GlobalStyles,StyledTitle};
