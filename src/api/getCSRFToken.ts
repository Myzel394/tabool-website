import Cookie from "js-cookie";


const getCSRFToken = async (): Promise<string> => {
    return Cookie.get("csrftoken");
};

export default getCSRFToken;

