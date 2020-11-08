import React, {useMemo} from "react";
import {Box, Grid, useTheme} from "@material-ui/core";

export interface IBadges {
    children: JSX.Element[];
}

const SPACING = 2;

const Badges = ({children}: IBadges) => {
    const theme = useTheme();
    const boxStyle = useMemo(() => ({
        height: 0,
    }), []);
    const style = useMemo(() => ({
        transform: "translateY(-50%)",
        height: "fit-content",
    }), []);

    return (
        <Box
            mr={1}
            style={boxStyle}
        >
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
export {default as HomeworkBadge} from "./HomeworkBadge";
export {default as MaterialBadge} from "./MaterialBadge";
