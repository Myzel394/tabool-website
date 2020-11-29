import {createContext} from "react";

export interface IErrorContext {
    error?: {
        status: number;
        message: string;
        avoidReloading: boolean;
    };
}

export const initialAxiosState: IErrorContext = {
    error: undefined,
};

const ErrorContext = createContext<IErrorContext>(initialAxiosState);

export default ErrorContext;
