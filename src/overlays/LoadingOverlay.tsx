import React from "react";
import {CircularProgress} from "@material-ui/core";
import {SimpleCenter} from "components";

export interface IIsLoading {
    loading: boolean;
    children: () => JSX.Element;
}

const LoadingOverlay = ({loading, children}: IIsLoading): JSX.Element => {
    if (loading) {
        return (
            <SimpleCenter>
                <CircularProgress />
            </SimpleCenter>
        );
    }

    return children();
};

export default LoadingOverlay;
