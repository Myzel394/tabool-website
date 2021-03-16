import React, {ReactNode, useContext, useEffect} from "react";
import {AxiosContext, UserContext} from "contexts";
import {initialUserState, IUser} from "contexts/UserContext";
import {ActionType} from "types";
import {ContextDevTool} from "react-context-devtool";
import createPersistedReducer from "use-persisted-reducer";
import update from "immutability-helper";

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

        case "change_load_scooso_data": {
            const {loadScoosoData} = action.payload;

            return update(state, {
                data: {
                    loadScoosoData: {
                        $set: loadScoosoData,
                    },
                },
            });
        }

        case "login": {
            const {
                hasFilledOutData,
                isConfirmed,
                firstName,
                lastName,
                email,
                id,
                loadScoosoData,
            } = action.payload;

            return {
                ...state,
                isAuthenticated: true,
                isFullyRegistered: hasFilledOutData,
                isEmailVerified: isConfirmed,
                data: {
                    firstName,
                    lastName,
                    email,
                    id,
                    loadScoosoData,
                },
            };
        }

        case "verify-email": {
            return {
                ...state,
                isEmailVerified: true,
            };
        }

        case "fill-out-data": {
            return {
                ...state,
                isFullyRegistered: true,
            };
        }

        case "registration": {
            const {
                preferences: preference,
                email,
                firstName,
                lastName,
                id,
            } = action.payload;

            return {
                ...state,
                isEmailVerified: Boolean(process.env.IS_EXPERIMENTAL),
                isAuthenticated: true,
                preference,
                data: {
                    firstName,
                    email,
                    id,
                    lastName,
                    loadScoosoData: true,
                },
            };
        }

        case "setPreferences": {
            const {newPreferences} = action.payload;

            return update(state, {
                preference: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    $apply: value => update(value ?? {}, {
                        data: {
                            $set: newPreferences,
                        },
                    }),
                },
            });
        }

        default: {
            throw new Error();
        }
    }
};

const UserContextHandler = ({children}: IUserContextHandler) => {
    const {setInstance} = useContext(AxiosContext);

    const [state, dispatch]: [IUser, any] = usePersistedReducer(reducer, initialUserState);


    // Create Axios instance
    useEffect(() => {
        const newInstance = createInstance(dispatch);

        setInstance(() => newInstance);
    }, [setInstance, dispatch]);

    return (
        <UserContext.Provider
            value={{
                state, dispatch,
            }}
        >
            {children}
            <ContextDevTool context={UserContext} id="userContextId" displayName="UserContext" />
            <UserContext.Consumer>
                {
                    values => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        if (window._REACT_CONTEXT_DEVTOOL) {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            window._REACT_CONTEXT_DEVTOOL({
                                id: "uniqContextId", displayName: "Context Display Name", values,
                            });
                        }
                        return null;
                    }
                }
            </UserContext.Consumer>
        </UserContext.Provider>
    );
};

export default UserContextHandler;
