import React, {memo, ReactNode} from "react";
import {Box, Grid} from "@material-ui/core";

import Header from "./Header";

export interface IForm {
    form: ReactNode;
    actions: ReactNode;
    headerTitle: string;
    onSubmit: () => void;
}

export const buildGrid = (elements: JSX.Element[]): JSX.Element =>
    <Grid container spacing={2}>
        {elements.map((element, index) =>
            <Grid
                item
                xs={12}
                md={6}
                key={index}
            >
                {element}
            </Grid>)}
    </Grid>;


const Form = ({headerTitle, form, actions, onSubmit}: IForm) => {
    return (
        <>
            <Header title={headerTitle} />
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
