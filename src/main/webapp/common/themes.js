import baseEnterprise from '@splunk/themes/enterprise';
// import baseLite from '@splunk/themes/lite';

export const variable = name => props => props.theme['solution-guidance'][name];
// export const mixin = name => (...args) => props => props.theme['solution-guidance'].mixins[name](...args);
//
export const enterprise = { 'solution-guidance': baseEnterprise }; // prettier-ignore
export const lite = { 'solution-guidance': baseEnterprise }; // prettier-ignore
export const themes = { enterprise, lite };

