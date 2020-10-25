import React, {ReactNode, useContext, useMemo} from "react";
import AxiosContext, {IAxios} from "contexts/AxiosContext";
import axios, {AxiosError} from "axios";
import applyCaseMiddleware from "axios-case-converter";
import {UserContext} from "contexts";
import {useLocation} from "react-router";

export interface IAxiosContextHandler {
    children: ReactNode;
}

const AxiosContextHandler = ({children}: IAxiosContextHandler) => {
    const {dispatch} = useContext(UserContext);
    const location = useLocation();
    const client: IAxios = useMemo(() => {
        const instance = applyCaseMiddleware(axios.create({
            baseURL: "http://127.0.0.1:8000/",
        }));

        instance.interceptors.response.use(response => response, (error: AxiosError) => {
            if (error.response?.status === 401 && location.pathname !== "/auth/login/") {
                dispatch({
                    type: "logout",
                    payload: {},
                });
            }

            return Promise.reject(error);
        });

        return {
            instance,
        };
    }, [dispatch, location]);

    return (
        <AxiosContext.Provider value={client}>
            {children}
        </AxiosContext.Provider>
    );
};

export default AxiosContextHandler;
