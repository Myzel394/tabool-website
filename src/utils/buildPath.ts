import * as queryString from "querystring";
import {ParsedUrlQueryInput} from "querystring";

import {generatePath} from "react-router-dom";

const buildPath = (
    url: string,
    params?: { [paramName: string]: string | number | boolean | undefined; },
    queryParams?: ParsedUrlQueryInput,
) => {
    const path = generatePath(url, params);
    const queries = queryString.stringify(queryParams);

    return `${path}?${queries}`;
};

export default buildPath;
