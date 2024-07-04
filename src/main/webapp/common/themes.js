import baseEnterprise from '@splunk/themes/enterprise';

export const variable = name => props => props.theme['solution-guidance'][name];
export const enterprise = { 'solution-guidance': baseEnterprise }; // prettier-ignore
export const lite = { 'solution-guidance': baseEnterprise }; // prettier-ignore
export const themes = { enterprise, lite };

