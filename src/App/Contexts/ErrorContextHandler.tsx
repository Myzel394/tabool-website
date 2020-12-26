import React, {memo, ReactNode, useReducer} from "react";
import ErrorContext, {DispatchType, IError, initialErrorState} from "contexts/ErrorContext";
import update from "immutability-helper";

import ErrorComponent from "../Error";

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
                avoidReloading = false,
                status,
                message,
                onRetry,
                dialog,
            } = action.payload;
            const data = {
                avoidReloading,
                status,
                message,
                onRetry,
                dialog,
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
            avoidReloading,
            dialog,
            message,
            onRetry,
            status,
            title,
        } = state.error;

        return (
            <ErrorComponent
                avoidReloading={avoidReloading}
                dialog={dialog}
                message={message}
                status={status}
                title={title}
                onRetry={onRetry}
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
