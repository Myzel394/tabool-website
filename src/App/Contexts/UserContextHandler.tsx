import React, {ReactNode, useCallback, useMemo} from "react";
import {AxiosContext, UserContext} from "contexts";
import {initialUserState, IUser, reducer} from "contexts/UserContext";
import createPersistedReducer from "use-persisted-reducer";
import {AxiosError} from "axios";
import {UserType} from "api";
import {buildPath, parseErrors} from "utils";
import {createInstance} from "contexts/AxiosContext";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {reset} from "states";
import {useSnackbar} from "hooks";
import {useTranslation} from "react-i18next";

import UserProviderHandler from "./UserProviderHandler";

const usePersistedReducer = createPersistedReducer("user");

export interface UserContextHandlerProps {
    children: ReactNode;
}

const UserContextHandler = ({children}: UserContextHandlerProps) => {
    const history = useHistory();
    const reduxDispatch = useDispatch();
    const {addError} = useSnackbar();
    const {t} = useTranslation();

    const [state, dispatch]: [IUser, any] = usePersistedReducer(reducer, initialUserState);
    const logout = useCallback(() => {
        dispatch({
            type: "logout",
            payload: {},
        });
        reduxDispatch(reset());
        history.push(buildPath("/auth/login/"));

        return null;
    }, [dispatch, history, reduxDispatch]);

    const instance = useMemo(() => {
        const instance = createInstance(error =>
            addError(error, t("Es konnte keine Internetverbindung aufgebaut werden")));

        instance.interceptors.response.use(response => response, (error: AxiosError) => {
            if (error.response) {
                // Logout user on authentication error
                if (error.response.status === 401 && location.pathname !== buildPath("/auth/login/")) {
                    logout();
                }
                // Parse errors
                if (error.response.status >= 300 || error.response.status < 200) {
                    error.response.data = parseErrors(error.response.data);
                }
            }

            return Promise.reject(error);
        });

        return instance;
    }, [logout, addError, t]);

    const buildUrl = useCallback((url: string) => {
        if (state.data?.userType === UserType.Student) {
            return `/api/student${url}`;
        } else {
            return `/api/teacher${url}`;
        }
    }, [state.data?.userType]);

    return (
        <AxiosContext.Provider
            value={{
                buildUrl,
                instance,
            }}
        >
            <UserContext.Provider
                value={{
                    state,
                    dispatch,
                    logout,
                }}
            >
                <UserProviderHandler />
                {children}
            </UserContext.Provider>
        </AxiosContext.Provider>
    );
};

export default UserContextHandler;
