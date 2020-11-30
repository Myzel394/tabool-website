import React, {ReactNode, useContext} from "react";
import AxiosContext, {IAxios} from "contexts/AxiosContext";
import axios, {AxiosError} from "axios";
import {UserContext} from "contexts";
import {useLocation} from "react-router";
import {useMemoOne} from "use-memo-one";
import camelcaseKeys from "camelcase-keys";
import {snakeCaseKeys} from "utils";

export interface IAxiosContextHandler {
    children: ReactNode;
}

const AxiosContextHandler = ({children}: IAxiosContextHandler) => {
    const {dispatch} = useContext(UserContext);
    const location = useLocation();
    const client: IAxios = useMemoOne(() => {
        const instance = axios.create({baseURL: "http://127.0.0.1:8000/"});

        // Logout user on authentication error
        instance.interceptors.response.use(response => response, (error: AxiosError) => {
            if (error.response?.status === 401 && location.pathname !== "/auth/login/") {
                dispatch({type: "logout",
                    payload: {}});
            }

            return Promise.reject(error);
        });

        // Camelcase response
        instance.interceptors.response.use(response => {
            response.data = camelcaseKeys(response.data ?? {}, {deep: true});

            return response;
        });

        // Snakecase request
        instance.interceptors.request.use(config => {
            config.data = snakeCaseKeys(config.data ?? {});
            config.params = snakeCaseKeys(config.params ?? {});

            return config;
        });

        return {instance};
    }, [dispatch, location]);

    return (
        <AxiosContext.Provider value={client}>
            {children}
        </AxiosContext.Provider>
    );
};

export default AxiosContextHandler;
