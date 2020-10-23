import React from "react";
import {FormHelperText} from "@material-ui/core";

export interface INonFieldErrors {
    errors: string[];
}

const NonFieldErrors = ({errors}: INonFieldErrors) => {
    return (
        <FormHelperText error>
            {errors.map(error =>
                <span key={error}>
                    {error}
                </span>)}
        </FormHelperText>
    );
};

export default NonFieldErrors;
