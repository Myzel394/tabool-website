import React from "react";
import {Button, CircularProgress} from "@material-ui/core";
import {ButtonProps} from "@material-ui/core/Button/Button";

export interface IPrimaryButton extends ButtonProps {
    loading?: boolean;
}

const PrimaryButton = ({children, loading, ...other}: IPrimaryButton) => {
    return (
        <Button
            disabled={loading}
            endIcon={loading ? <CircularProgress size="1rem" color="inherit" /> : undefined}
            {...other}
            variant="contained"
            color="primary"
        >
            {children}
        </Button>
    );
};

export default PrimaryButton;
