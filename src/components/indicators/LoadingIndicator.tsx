import React from "react";
import {CircularProgress} from "@material-ui/core";
import {SimpleCenter} from "components/index";

export interface ILoadingIndicator {
    children: () => JSX.Element;
    isLoading?: boolean;
}

const LoadingIndicator = ({isLoading, children}: ILoadingIndicator): JSX.Element => {
    if (isLoading) {
        return (
            <SimpleCenter>
                <CircularProgress />
            </SimpleCenter>
        );
    }

    return children();
};

LoadingIndicator.defaultProps = {
    isLoading: true,
};

export default LoadingIndicator;
