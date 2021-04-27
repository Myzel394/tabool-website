import {createContext} from "react";
import axios, {AxiosError, AxiosInstance} from "axios";
import camelcaseKeys from "camelcase-keys";

import {snakeCaseKeys} from "../utils";
import {isDev} from "../constants/dev";

export type BuildUrlFunction = (value: string) => string;

export interface IAxios {
    instance: AxiosInstance;
    buildUrl: BuildUrlFunction;
}

export const initialAxiosState: IAxios = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instance: null,
    buildUrl: (url: string) => url,
};

const AxiosContext = createContext<IAxios>(initialAxiosState);

export const baseURL = isDev ? "http://127.0.0.1:8000/" : "";

export const createInstance = (onMissingConnection: (error: AxiosError) => any) => {
    const instance = axios.create({
        baseURL,
    });

    // Camelcase response
    instance.interceptors.response.use(response => {
        response.data = camelcaseKeys(response.data ?? {}, {deep: true});

        return response;
    }, error => {
        // No internet
        if (!error.response) {
            onMissingConnection(error);
        }

        if (error.response) {
            error.response.data = camelcaseKeys(error.response?.data ?? {}, {deep: true});
        }

        return Promise.reject(error);
    });

    // Snakecase request
    instance.interceptors.request.use(config => {
        if (!(config.data instanceof FormData)) {
            config.data = snakeCaseKeys(config.data ?? {});
        }
        config.params = snakeCaseKeys(config.params ?? {});

        return config;
    });

    return instance;
};

export default AxiosContext;
