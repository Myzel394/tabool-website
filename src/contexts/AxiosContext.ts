import {createContext} from "react";
import axios, {AxiosInstance} from "axios";
import update from "immutability-helper";
import camelcaseKeys from "camelcase-keys";

import {ActionType} from "../types";
import {snakeCaseKeys} from "../utils";

import {initialUserState, IUser} from "./UserContext";

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

export const baseURL = process.env.NODE_ENV === "production" ? "" : "http://127.0.0.1:8000/";

export const createInstance = () => {
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

    return instance;
};

export const reducer = (state: IUser, action: ActionType): IUser => {
    switch (action.type) {
        case "logout": {
            return initialUserState;
        }

        case "login": {
            const {
                firstName,
                lastName,
                email,
                gender,
                userType,
                id,
                preference,
            } = action.payload;

            return {
                ...state,
                isAuthenticated: true,
                preference,
                data: {
                    firstName,
                    lastName,
                    email,
                    gender,
                    userType,
                    id,
                },
            };
        }

        case "setPreferences": {
            const {newPreferences} = action.payload;

            return update(state, {
                preference: {
                    data: {
                        $set: newPreferences,
                    },
                },
            });
        }

        default: {
            throw new Error();
        }
    }
};

export default AxiosContext;
