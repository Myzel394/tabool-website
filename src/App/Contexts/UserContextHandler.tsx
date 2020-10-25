import React, {ReactNode, useEffect} from "react";
import {UserContext} from "contexts";
import {initialUserState, IUser} from "contexts/UserContext";
import {ActionType} from "types";
import update from "immutability-helper";
import {ContextDevTool} from "react-context-devtool";
import createPersistedReducer from "use-persisted-reducer";
import axios from "axios";


const usePersistedReducer = createPersistedReducer("state");

export interface IUserContextHandler {
    children: ReactNode;
}

const reducer = (state: IUser, action: ActionType): IUser => {
    switch (action.type) {
    case "logout": {
        return initialUserState;
    }


    case "login": {
        const {isFullyRegistered, isEmailVerified} = action.payload;

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
        const {firstName, lastName} = action.payload;
        const func = value => update(value || {}, {
            firstName: {
                $set: firstName,
            },
            lastName: {
                $set: lastName,
            },
        });

        return update(
            state,
            {
                isFullyRegistered: {
                    $set: true,
                },
                data: {
                    $apply: func,
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

    default: {
        throw new Error();
    }
    }
};

const UserContextHandler = ({children}: IUserContextHandler) => {
    const [state, dispatch] = usePersistedReducer(reducer, initialUserState);

    // Logout user on authentication error
    useEffect(() => {
        axios.interceptors.response.use(response => response, (error) => {
            console.log(error);
        });
    }, []);

    return (
        <UserContext.Provider value={{state, dispatch}}>
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
