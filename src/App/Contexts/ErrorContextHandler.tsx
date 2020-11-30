import React, {memo} from "react";
import ErrorContext, {DispatchType, IError, initialErrorState} from "contexts/ErrorContext";
import {ActionType} from "types";
import update from "immutability-helper";
import _ from "lodash";
import createPersistedReducer from "use-persisted-reducer";

const usePersistedReducer = createPersistedReducer("error");

export interface IErrorContext {
    children: JSX.Element;
}

const reducer = (
    state: IError,
    action: DispatchType
): IError => {
    switch (action.type) {
        case "addError": {
            // @ts-ignore
            const {avoidReloading = false, status = 500, message, onRetry, dialog, string, id} = action.payload;
            const data = {
                avoidReloading,
                status,
                message,
                onRetry,
                dialog,
                string,
            };

            return update(state, {
                errors: {
                    [id]: {
                        $set: data
                    }
                }
            });
        }
        case "removeError": {
            // @ts-ignore
            const {id} = action.payload;

            // @ts-ignore
            return _.omit(state, [`errors.${id}`]);
        }
        case "clearErrors": {
            return initialErrorState;
        }
    }
}

const ErrorContextHandler = ({children}: IErrorContext) => {
    const [state, dispatch] = usePersistedReducer(reducer, initialErrorState);

    return (
        <ErrorContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </ErrorContext.Provider>
    );
}

export default memo(ErrorContextHandler);
