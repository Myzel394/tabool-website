import React, {ReactNode, useMemo} from "react";
import {Tooltip} from "components";
import {Box, useTheme} from "@material-ui/core";

export interface ILessonBadge {
    description: string;
    getIcon: (props) => ReactNode;
}

const LessonBadge = ({description, getIcon}: ILessonBadge) => {
    const theme = useTheme();

    return (
        <Tooltip title={description}>
            <Box
                component="span"
                display="flex"
                width="fit-content"
                height="fit-content"
                justifyContent="center"
                alignItems="center"
                p={4}
                style={{
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                {getIcon({
                    color: theme.palette.primary.main,
                    fontSize: "large",
                })}
            </Box>
        </Tooltip>
    );
};

export default LessonBadge;
