import React, {ReactNode, useState} from "react";
import {AxiosContext} from "contexts";
import axios, {AxiosError, AxiosInstance} from "axios";
import camelcaseKeys from "camelcase-keys";
import {buildPath, parseErrors, snakeCaseKeys} from "utils";

export interface IAxiosContextHandler {
    children: ReactNode;
}

const baseURL = process.env.NODE_ENV === "production" ? "" : "http://127.0.0.1:8000/";

export const createInstance = (userDispatch) => {
    const instance = axios.create({
        baseURL,
    });

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
            if (error.response.status === 401 && location.pathname !== buildPath("/auth/login/")) {
                userDispatch({
                    type: "logout",
                    payload: {},
                });
            }
            if (error.response.status >= 300 || error.response.status < 200) {
                error.response.data = parseErrors(error.response.data);
            }
        }

        return Promise.reject(error);
    });

    return instance;
};

const AxiosContextHandler = ({children}: IAxiosContextHandler) => {
    const [instance, setInstance] = useState<AxiosInstance>(() => axios.create({
        baseURL,
    }));

    return (
        <AxiosContext.Provider
            value={{
                instance,
                setInstance,
            }}
        >
            {children}
        </AxiosContext.Provider>
    );
};

export default AxiosContextHandler;
