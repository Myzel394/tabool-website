import {AxiosRequestConfig} from "axios";

import getCSRFToken from "./getCSRFToken";

const getLoginConfig = async (): Promise<AxiosRequestConfig> => {
    return {
        withCredentials: true,
        headers: {
            "X-CSRFTOKEN": await getCSRFToken(),
        },
    };
};

export default getLoginConfig;
