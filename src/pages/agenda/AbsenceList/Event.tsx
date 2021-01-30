import React from "react";
import {Absence} from "types";
import {useTheme} from "@material-ui/core";


const Event = ({
    event,
}) => {
    const theme = useTheme();
    const absence: Absence = event.resource;

    return (
        <div
            style={{
                backgroundColor: absence.lesson.course.subject.userRelation.color,
                width: 8,
                height: 8,
                borderRadius: theme.shape.borderRadius,
            }}
        />
    );
};
export default Event;


