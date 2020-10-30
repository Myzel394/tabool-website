import React, {useMemo} from "react";
import {Box, Grid, useTheme} from "@material-ui/core";

export interface IBadges {
    children: JSX.Element[];
}

const SPACING = 2;

const Badges = ({children}: IBadges) => {
    const theme = useTheme();
    const style = useMemo(() => ({
        transform: `translateY(calc(50% - ${theme.spacing(SPACING) * 0.5}px))`,
    }), [theme]);

    return (
        <Box mr={1}>
            <Grid
                container
                justify="flex-end"
                spacing={SPACING}
                style={style}
            >
                {children.map(element =>
                    <Grid key={element.props.key} item>
                        {element}
                    </Grid>)}
            </Grid>
        </Box>
    );
};

export default Badges;
