import React, {ReactNode, useContext, useMemo} from "react";
import AxiosContext, {IAxios} from "contexts/AxiosContext";
import axios, {AxiosError} from "axios";
import {UserContext} from "contexts";
import {useLocation} from "react-router";
import {useMemoOne} from "use-memo-one";
import camelcaseKeys from "camelcase-keys";
import {parseErrors, snakeCaseKeys} from "utils";
import {generatePath} from "react-router-dom";

export interface IAxiosContextHandler {
    children: ReactNode;
}

const AxiosContextHandler = ({children}: IAxiosContextHandler) => {
    const {dispatch} = useContext(UserContext);
    const location = useLocation();
    const client: IAxios = useMemo(() => {
        const instance = axios.create({baseURL: "http://127.0.0.1:8000/"});

        // Camelcase response
        instance.interceptors.response.use(response => {
            response.data = camelcaseKeys(response.data ?? {}, {deep: true});

            return response;
        }, error => {
            error.response.data = camelcaseKeys(error.response.data ?? {}, {deep: true});

            return Promise.reject(error);
        });

        // Snakecase request
        instance.interceptors.request.use(config => {
            config.data = snakeCaseKeys(config.data ?? {});
            config.params = snakeCaseKeys(config.params ?? {});

            return config;
        });

        instance.interceptors.response.use(response => response, (error: AxiosError) => {
            if (error.response) {
                // Logout user on authentication error
                if (error.response.status === 401 && location.pathname !== generatePath("/auth/login/")) {
                    dispatch({type: "logout",
                        payload: {}});
                }
                if (error.response.status >= 300 || error.response.status < 200) {
                    error.response.data = parseErrors(error.response.data);
                }
            }

            return Promise.reject(error);
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
