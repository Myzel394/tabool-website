import React, {useEffect} from "react";
import {AxiosError} from "axios";

import {ErrorPage} from "../pages";


export interface IResponseWrapper<Data, Error = AxiosError> {
    isLoading?: boolean;
    renderLoading: () => JSX.Element;

    error?: Error | null;
    // No data available and error
    renderCriticalError?: (error: Error) => JSX.Element;
    renderNoDataAvailable: () => JSX.Element;
    renderError: (error: Error, data?: Data | null) => JSX.Element;

    data?: Data | null;
    children: (data: Data) => JSX.Element | null;

    getDocumentTitle?: (data: Data) => string;
}

const ResponseWrapper = <Data extends any, Error = AxiosError>({
    children: render,
    data,
    error,
    isLoading,
    renderError,
    renderCriticalError,
    renderNoDataAvailable,
    renderLoading,
    getDocumentTitle,
}: IResponseWrapper<Data, Error>): JSX.Element | null => {
    // Update title
    useEffect(() => {
        if (getDocumentTitle && !isLoading && !error && data) {
            document.title = getDocumentTitle(data);
        }
    }, [getDocumentTitle, isLoading, error, data]);

    if (isLoading) {
        return renderLoading();
    }

    if (error && !data) {
        return (renderCriticalError ?? renderError)(error);
    }

    if (error) {
        return renderError(error, data);
    }

    if (!data) {
        return renderNoDataAvailable();
    }

    return render(data);
};

ResponseWrapper.defaultProps = {
    renderNoDataAvailable() {
        return <ErrorPage />;
    },
    renderError(error) {
        return <ErrorPage status={error?.response?.status} />;
    },
};

export default ResponseWrapper;
