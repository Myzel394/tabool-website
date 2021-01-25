import React from "react";
import {Button, Grid, IconButton, Paper} from "@material-ui/core";
import {FaAngleLeft, FaAngleRight} from "react-icons/all";
import {navigate as navigationConstants} from "react-big-calendar/lib/utils/constants";


const Toolbar = ({
    label,
    onNavigate,
}) => {
    return (
        <Paper>
            <Grid container direction="row" alignItems="center" justify="center">
                <Grid item>
                    <IconButton onClick={() => onNavigate(navigationConstants.PREVIOUS)}>
                        <FaAngleLeft />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Button onClick={() => onNavigate(navigationConstants.TODAY)}>
                        {label}
                    </Button>
                </Grid>
                <Grid item>
                    <IconButton onClick={() => onNavigate(navigationConstants.NEXT)}>
                        <FaAngleRight />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Toolbar;
