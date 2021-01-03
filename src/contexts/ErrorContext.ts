/* eslint-disable @typescript-eslint/ban-ts-comment */
import {createContext} from "react";
import {ActionType} from "types";

export interface ErrorType {
    status?: number;
    title?: string;
    message?: string;
}

export interface IError {
    error?: ErrorType;
}

export const initialErrorState: IError = {
    error: undefined,
};

interface IAddError {
    title?: string;
    message?: string;
    status?: number;
}

export type DispatchType = ActionType<
    "setError" | "removeError",
    IAddError
    >;


// @ts-ignore
const ErrorContext = createContext<{
    state: IError;
    dispatch: (action: DispatchType) => IError;
}>();

export default ErrorContext;
