import {createRESTURL} from '@splunk/splunk-utils/url';


function generateURLParams(params, isDefault) {
    if (params == null) {
        return '';
    }
    let queryParams = '';
    if (isDefault) {
        for (const p in params) {
            queryParams = `${queryParams}search=${p}=${params[p]}&`;
        }
    } else {
        for (const p in params) {
            queryParams = `${queryParams}${p}=${params[p]}&`;
        }
    }
    return encodeURI(queryParams);
}


function createURL(endpoint, params) {
    return `${createRESTURL(endpoint)}?${generateURLParams(
        params
    )}`;
}

function getPredictSPL(query) {
    console.log("query:"+ query);

    return     `| makeresults
                | eval input="${query}"
                | translate
                | eval content = lower(content)
                | apply preprocess_TFIDF_apps_core
                | apply prediction_apps_core
                | rename "predicted(app_name)" as app_name
                | fields app_name
                | lookup   apps.csv app_name `
}


export {
    createURL,
    getPredictSPL
}
