import React, {memo, ReactNode, useReducer} from "react";
import ErrorContext, {DispatchType, IError, initialErrorState} from "contexts/ErrorContext";
import update from "immutability-helper";

import ErrorComponent from "./Error";

export interface IErrorContext {
    children: ReactNode;
}

const reducer = (
    state: IError,
    action: DispatchType,
): IError => {
    switch (action.type) {
        case "setError": {
            const {
                status,
                message,
            } = action.payload;
            const data = {
                status,
                message,
            };

            return update(state, {error: {$set: data}});
        }
        case "removeError": {
            return initialErrorState;
        }
        default:
            throw new Error("Invalid type");
    }
};

const ErrorContextHandler = ({children}: IErrorContext) => {
    const [state, dispatch]: [IError, any] = useReducer(reducer, initialErrorState);

    if (state.error) {
        const {
            message,
            status,
            title,
        } = state.error;

        return (
            <ErrorComponent
                message={message}
                status={status}
                title={title}
            />
        );
    }

    return (
        <ErrorContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </ErrorContext.Provider>
    );
};

export default memo(ErrorContextHandler);
