import * as queryString from "querystring";
import {ParsedUrlQueryInput} from "querystring";

import {generatePath} from "react-router-dom";

const buildPath = (
    url: string,
    params?: { [paramName: string]: string | number | boolean | undefined; },
    queryParams?: ParsedUrlQueryInput,
): string => {
    const path = `/app${generatePath(url, params)}`;

    if (queryParams) {
        const queries = queryString.stringify(queryParams);

        return `${path}?${queries}`;
    }

    return path;
};

export default buildPath;
