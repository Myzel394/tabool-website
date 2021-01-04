import React, {ReactNode} from "react";
import {UserContext} from "contexts";
import {initialUserState, IUser} from "contexts/UserContext";
import {ActionType} from "types";
import update from "immutability-helper";
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
                isFullyRegistered,
                isEmailVerified,
                firstName,
                lastName,
                email,
                id,
            } = action.payload;

            return update(
                state,
                {
                    isAuthenticated: {
                        $set: true,
                    },
                    isFullyRegistered: {
                        $set: isFullyRegistered,
                    },
                    isEmailVerified: {
                        $set: isEmailVerified,
                    },
                    data: {
                        $apply: value => update<IUser["data"]>(value ?? {} as IUser["data"], {
                            firstName: {
                                $set: firstName,
                            },
                            lastName: {
                                $set: lastName,
                            },
                            email: {
                                $set: email,
                            },
                            id: {
                                $set: id,
                            },
                        }),
                    },
                },
            );
        }

        case "verify-email": {
            return update(
                state,
                {
                    isEmailVerified: {
                        $set: true,
                    },
                },
            );
        }

        case "fill-out-data": {
            return update(
                state,
                {
                    isFullyRegistered: {
                        $set: true,
                    },
                },
            );
        }

        case "register": {
            return update(
                state,
                {
                    isAuthenticated: {
                        $set: true,
                    },
                },
            );
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
