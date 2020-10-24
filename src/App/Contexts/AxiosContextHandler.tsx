import React, {ReactNode, useEffect, useState} from "react";
import AxiosContext, {IAxios, initialAxiosState} from "contexts/AxiosContext";
import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

export interface IAxiosContextHandler {
    children: ReactNode;
}

const AxiosContextHandler = ({children}: IAxiosContextHandler) => {
    const [client, setClient] = useState<IAxios>(initialAxiosState);

    useEffect(() => {
        const client = applyCaseMiddleware(axios.create());
        client.interceptors.response.use(response => response, error => {
            console.log(error);
        });

        setClient({
            instance: client,
        });
    }, []);

    return (
        <AxiosContext.Provider value={client}>
            {children}
        </AxiosContext.Provider>
    );
};

export default AxiosContextHandler;
