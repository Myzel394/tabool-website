import React, {useCallback} from "react";
import {Grid, GridDirection, GridProps} from "@material-ui/core";
import {GridSpacing} from "@material-ui/core/Grid/Grid";

export interface IActions extends GridProps{
    children: JSX.Element[];
    spacing?: GridSpacing;
    direction?: GridDirection;
}

const Actions = ({spacing, direction, children, ...other}: IActions) => {
    const renderChild = useCallback(child =>
        <Grid key={child.key} item>
            {child}
        </Grid>, []);

    return (
        <Grid
            container
            spacing={spacing}
            direction={direction}
            {...other}
        >
            {children.map(renderChild)}
        </Grid>
    );
};

Actions.defaultProps = {
    spacing: 1,
    direction: "row",
};

export default Actions;
