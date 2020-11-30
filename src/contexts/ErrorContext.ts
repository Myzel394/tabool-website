import {createContext} from "react";
import {ActionType} from "../types";

export interface IError {
    errors: {
        [key: string]: {
            status: number;
            message: string;
            avoidReloading: boolean;
            onRetry?: () => any;
            dialog?: JSX.Element;
            dialogText?: string;
        };
    }
}

export const initialErrorState: IError = {
    errors: {}
};

interface IAddError {
    id: string;

    avoidReloading?: boolean;
    message?: string;
    status?: number;
    onRetry?: () => any;
    dialog?: JSX.Element;
    dialogText?: string;
}

interface IRemoveError {
    id: string;
}

export type DispatchType = ActionType<
    "addError" | "removeError" | "clearErrors",
    {} | IAddError | IRemoveError
    >;

// @ts-ignore
const ErrorContext = createContext<{
    state: IError;
    dispatch: (action: DispatchType) => IError;
}>();

export default ErrorContext;
