import {useCallback, useEffect, useState} from "react";

export type States = "idle" | "pending" | "success" | "error";

export interface IUseAsync<T, Error = string> {
    execute: () => Promise<T>;
    status: States;
    value: T | undefined;
    error: Error | undefined;
}

const useAsync = <T = undefined, Error = string>(
    asyncFunction: () => Promise<T>,
    immediate = true,
): IUseAsync<T, Error> => {
    const [status, setStatus] = useState<States>("idle");
    const [value, setValue] = useState<T>();
    const [error, setError] = useState<Error>();

    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(() => {
        setStatus("pending");
        setValue(undefined);
        setError(undefined);

        return asyncFunction()
            .then((response: any) => {
                setValue(response);
                setStatus("success");
                return response;
            })
            .catch((error: any) => {
                setError(error);
                setStatus("error");
            });
    }, [asyncFunction]);

    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return {
        execute,
        status,
        value,
        error,
    };
};

export default useAsync;
