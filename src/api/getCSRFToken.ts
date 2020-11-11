import Cookie from "js-cookie";


const getCSRFToken = (): string => {
    return Cookie.get("csrftoken") ?? "";
};

export default getCSRFToken;
