import {AxiosRequestConfig} from "axios";

import getCSRFToken from "./getCSRFToken";

const getLoginConfig = async (): Promise<AxiosRequestConfig> => {
    return {
        withCredentials: true,
        headers: {
            "X-CSRFTOKEN": getCSRFToken(),
        },
    };
};

export default getLoginConfig;
