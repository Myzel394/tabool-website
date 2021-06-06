import React from "react";
import {Box, Grid} from "@material-ui/core";

export interface BadgesProps {
    badges: JSX.Element[];
}

const boxStyle = {
    height: 0,
};
const style = {
    transform: "translateY(-50%)",
    height: "fit-content",
};

const Badges = ({badges}: BadgesProps) => {
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
                {badges.map(element =>
                    element && (
                        <Grid key={element.key} item>
                            {element}
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default Badges;
export {default as HomeworkBadge} from "./HomeworkBadge";
export {default as MaterialBadge} from "./MaterialBadge";
export {default as RoomChangeBadge} from "./RoomChangeBadge";
export {default as VideoConferenceBadge} from "./VideoConferenceBadge";
export {default as ExamBadge} from "./ExamBadge";
