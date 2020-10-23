import React, {memo, ReactNode} from "react";
import {Box, Grid} from "@material-ui/core";

export interface IForm {
    form: ReactNode;
    actions: ReactNode;
    onSubmit: () => void;
}

export const buildGrid = (elements: JSX.Element[]): JSX.Element =>
    <Grid container spacing={2}>
        {elements.map((element, index) =>
            <Grid
                key={index}
                item
                xs={12}
                md={6}
            >
                {element}
            </Grid>)}
    </Grid>;


const Form = ({form, actions, onSubmit}: IForm) => {
    return (
        <>
            <form
                onSubmit={event => {
                    event.preventDefault();
                    onSubmit();
                }}
            >
                {form}
                <Box marginTop={4}>
                    {actions}
                </Box>
            </form>
        </>
    );
};

export default memo(Form);
