import React, {ReactNode, useCallback, useEffect, useMemo} from "react";
import {AxiosContext, UserContext} from "contexts";
import {initialUserState, IUser} from "contexts/UserContext";
import createPersistedReducer from "use-persisted-reducer";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {IUpdatePreferenceData, useUpdatePreferenceAPI} from "hooks/apis";
import {Preference} from "types";
import {UserType} from "api";
import {buildPath, parseErrors} from "utils";
import {createInstance, reducer} from "contexts/AxiosContext";

const usePersistedReducer = createPersistedReducer("user");

export interface IUserContextHandler {
    children: ReactNode;
}

const UserContextHandler = ({children}: IUserContextHandler) => {
    const updatePreferences = useUpdatePreferenceAPI();

    const [state, dispatch]: [IUser, any] = usePersistedReducer(reducer, initialUserState);

    const instance = useMemo(() => {
        const instance = createInstance();

        instance.interceptors.response.use(response => response, (error: AxiosError) => {
            if (error.response) {
                // Logout user on authentication error
                if (error.response.status === 401 && location.pathname !== buildPath("/auth/login/")) {
                    dispatch({
                        type: "logout",
                        payload: {},
                    });
                }
                // Parse errors
                if (error.response.status >= 300 || error.response.status < 200) {
                    error.response.data = parseErrors(error.response.data);
                }
            }

            return Promise.reject(error);
        });

        return instance;
    }, [dispatch]);
    const buildUrl = useCallback((url: string) => {
        if (state.data?.userType === UserType.Student) {
            return `/api/student${url}`;
        } else {
            return `/api/teacher${url}`;
        }
    }, [state.data?.userType]);

    // Update preference
    const {
        mutate,
    } = useMutation<Preference, AxiosError, IUpdatePreferenceData>(
        values => {
            if (state.preference) {
                return updatePreferences(state.preference.id, values);
            }
            return new Promise((resolve, reject) => reject());
        },
        {
            retry: 3,
        },
    );

    useEffect(() => {
        if (state.preference) {
            mutate({
                data: state.preference.data,
            });
        }
    }, [mutate, state.data, state.preference]);

    return (
        <AxiosContext.Provider
            value={{
                buildUrl,
                instance,
            }}
        >
            <UserContext.Provider
                value={{
                    state, dispatch,
                }}
            >
                {children}
            </UserContext.Provider>
        </AxiosContext.Provider>
    );
};

export default UserContextHandler;
