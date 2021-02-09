import React, {ReactNode, useContext, useEffect} from "react";
import {AxiosContext, UserContext} from "contexts";
import {initialUserState, IUser} from "contexts/UserContext";
import createPersistedReducer from "use-persisted-reducer";
import update from "immutability-helper";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {IUpdatePreferenceData, useUpdatePreferenceAPI} from "hooks/apis";

import {ActionType, Preference} from "../../types";
import {UserType} from "../../api";

import {createInstance} from "./AxiosContextHandler";

const usePersistedReducer = createPersistedReducer("user");

export interface IUserContextHandler {
    children: ReactNode;
}

const reducer = (state: IUser, action: ActionType): IUser => {
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

const UserContextHandler = ({children}: IUserContextHandler) => {
    const {_initialize} = useContext(AxiosContext);
    const updatePreferences = useUpdatePreferenceAPI();

    const [state, dispatch]: [IUser, any] = usePersistedReducer(reducer, initialUserState);

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


    // Create Axios instance
    useEffect(() => {
        const newInstance = createInstance(dispatch);

        _initialize({
            instance: newInstance,
            buildUrl: (url: string) => {
                if (state.data?.userType === UserType.STUDENT) {
                    return `/api/student${url}`;
                } else {
                    return `/api/teacher${url}`;
                }
            },
        });
    }, [_initialize, dispatch, state.data?.userType]);

    return (
        <UserContext.Provider
            value={{
                state, dispatch,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextHandler;
