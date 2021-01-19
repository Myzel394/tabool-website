import React, {ReactNode} from "react";
import {UserContext} from "contexts";
import {initialUserState, IUser} from "contexts/UserContext";
import {ActionType} from "types";
import {ContextDevTool} from "react-context-devtool";
import createPersistedReducer from "use-persisted-reducer";

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
                hasFilledOutData,
                isConfirmed,
                firstName,
                lastName,
                email,
                id,
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
                email,
                firstName,
                lastName,
                id,
            } = action.payload;

            return {
                ...state,
                isAuthenticated: true,
                data: {
                    firstName,
                    email,
                    id,
                    lastName,
                },
            };
        }

        case "setPreferences": {
            const {newPreference} = action.payload;

            return {
                ...state,
                preferences: newPreference,
            };
        }

        default: {
            throw new Error();
        }
    }
};

const UserContextHandler = ({children}: IUserContextHandler) => {
    const [state, dispatch] = usePersistedReducer(reducer, initialUserState);

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
