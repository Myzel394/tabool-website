import Cookie from "js-cookie";
import {AxiosRequestConfig} from "axios";


const getCSRFToken = async (): Promise<string> => {
    return Cookie.get("csrftoken");
};

export default getCSRFToken;


export const includeCSRFToken = async (): Promise<AxiosRequestConfig> => {
    return {
        withCredentials: true,
        headers: {
            "X-CSRFTOKEN": await getCSRFToken(),
        },
    };
};
