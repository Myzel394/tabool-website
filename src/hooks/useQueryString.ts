import queryString, {ParsedQuery, ParseOptions} from "query-string";
import {useLocation} from "react-router";

const useQueryString = (options?: ParseOptions): ParsedQuery<string> => {
    const location = useLocation();
    const queryParams = queryString.parse(location.search, options);

    return queryParams;
};

export default useQueryString;
