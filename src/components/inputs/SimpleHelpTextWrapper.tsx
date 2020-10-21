import React, {ReactNode} from "react";
import {FormGroup, FormHelperText} from "@material-ui/core";

export interface ISimpleHelpTextWrapper {
    children: ReactNode;
    helpText?: string;
}

const SimpleHelpTextWrapper = ({children, helpText}: ISimpleHelpTextWrapper) => {
    return (
        <FormGroup>
            {children}
            {helpText && <FormHelperText>{helpText}</FormHelperText>}
        </FormGroup>
    );
};

export default SimpleHelpTextWrapper;
