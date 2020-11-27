import React from "react";
import {CircularProgress} from "@material-ui/core";
import {SimpleCenter} from "components/index";

export interface ILoadingIndicator {
    children?: () => JSX.Element;
    isLoading?: boolean;
}

const LoadingIndicator = ({isLoading, children}: ILoadingIndicator) => {
    if (isLoading) {
        return (
            <SimpleCenter>
                <CircularProgress />
            </SimpleCenter>
        );
    }

    return children ? children() : null;
};

LoadingIndicator.defaultProps = {
    isLoading: true,
};

export default LoadingIndicator;
