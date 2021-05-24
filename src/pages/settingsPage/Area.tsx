import React, {ReactNode} from "react";
import {Grid, Typography} from "@material-ui/core";

// TODO: Seriously

export interface AreaProps {
    title: string;
    children: ReactNode;
}

const style = {
    width: "100%",
};

const Area = ({title, children}: AreaProps) => {
    return (
        <Grid container spacing={1}>
            <Grid item>
                <Typography variant="h5" component="h1">
                    {title}
                </Typography>
            </Grid>
            <Grid item style={style}>
                {children}
            </Grid>
        </Grid>
    );
};

export default Area;
