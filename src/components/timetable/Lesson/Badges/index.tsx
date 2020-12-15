import React, {useMemo} from "react";
import {Box, Grid} from "@material-ui/core";

type BadgeType = JSX.Element | null;

export interface IBadges {
    children: BadgeType[];
}

const Badges = ({children}: IBadges) => {
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
                style={style}
            >
                {children.map(element =>
                    element && <Grid key={element.props.key} item>
                        {element}
                    </Grid>)}
            </Grid>
        </Box>
    );
};

export default Badges;
export {default as HomeworkBadge} from "./HomeworkBadge";
export {default as MaterialBadge} from "./MaterialBadge";
export {default as RoomChangeBadge} from "./RoomChangeBadge";
