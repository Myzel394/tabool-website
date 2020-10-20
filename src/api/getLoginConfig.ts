import {AxiosRequestConfig} from "axios";

import getCSRFToken from "./getCSRFToken";

const getLoginData = async (): Promise<AxiosRequestConfig> => {
    return {
        withCredentials: true,
        headers: {
            "X-CSRFTOKEN": await getCSRFToken(),
        },
    };
};

export default getLoginData;
