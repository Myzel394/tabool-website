import React, {cloneElement, memo} from "react";
import {Box, FormGroup, FormHelperText, Grid, Typography} from "@material-ui/core";

export interface IFormElement {
    title: string;
    form: JSX.Element;
    icon?: JSX.Element;
    helpTexts?: string[];
    errors?: string[];
}

const FormElement = ({
    errors,
    form,
    helpTexts,
    icon,
    title,
}: IFormElement) => {
    return (
        <FormGroup>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography
                        variant="h5"
                        color="textSecondary"
                    >
                        <Box display="flex" flexDirection="row" alignItems="center">
                            {icon}
                            <Box ml={1} component="span">
                                {title}
                            </Box>
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {cloneElement(form, {
                        error: (errors ?? []).length > 0,
                        fullWidth: true,
                    })}
                </Grid>
                {errors && (
                    <Grid item xs={12}>
                        {errors.map(error => (
                            <FormHelperText key={error} error>
                                {error}
                            </FormHelperText>
                        ))}
                    </Grid>
                )}
                {helpTexts && (
                    <Grid item xs={12}>
                        {helpTexts.map(helpText => (
                            <FormHelperText key={helpText}>
                                {helpText}
                            </FormHelperText>
                        ))}
                    </Grid>
                )}
            </Grid>
        </FormGroup>
    );
};

export default memo(FormElement);
