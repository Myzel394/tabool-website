import React, {ReactNode} from "react";
import {UserContext} from "contexts";
import {initialUserState, IUser} from "contexts/user";
import {ActionType} from "types";
import update from "immutability-helper";
import {ContextDevTool} from "react-context-devtool";
import createPersistedReducer from "use-persisted-reducer";


const usePersistedReducer = createPersistedReducer("state");

export interface IUserContextHandler {
    children: ReactNode;
}

const reducer = (state: IUser, action: ActionType): IUser => {
    switch (action.type) {
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
        const {firstName, lastName} = action.payload;
        return update(
            state,
            {
                isFullyRegistered: {
                    $set: true,
                },
                data: {
                    firstName: {
                        $set: firstName,
                    },
                    lastName: {
                        $set: lastName,
                    },
                },
            },
        );
    }

    case "register": {
        const {email, id} = action.payload;
        const func = value => update(value || {}, {
            email: {
                $set: email,
            },
            id: {
                $set: id,
            },
        });
        return update(
            state,
            {
                isAuthenticated: {
                    $set: true,
                },
                data: {
                    $apply: func,
                },
            },
        );
    }

    case "login": {
        const {email, firstName, lastName} = action.payload;

        return update(
            state,
            {
                isAuthenticated: {
                    $set: true,
                },
                data: {
                    email: {
                        $set: email,
                    },
                    firstName: {
                        $set: firstName,
                    },
                    lastName: {
                        $set: lastName,
                    },
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
        <UserContext.Provider value={{state, dispatch}}>
            <ContextDevTool context={UserContext} id="userContextId" displayName="UserContext" />
            {children}
            <UserContext.Consumer>
                {
                    values => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        if (window._REACT_CONTEXT_DEVTOOL) {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            window._REACT_CONTEXT_DEVTOOL({id: "uniqContextId", displayName: "Context Display Name", values});
                        }
                        return null;
                    }
                }
            </UserContext.Consumer>
        </UserContext.Provider>
    );
};

export default UserContextHandler;
