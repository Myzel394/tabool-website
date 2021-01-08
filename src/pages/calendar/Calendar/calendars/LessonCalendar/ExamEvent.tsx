import React, {memo} from "react";
import {ExamDetail} from "types";
import {Link, Typography} from "@material-ui/core";
import {FaStickyNote} from "react-icons/all";
import {buildPath} from "utils";


export interface IExamEvent {
    event: ExamDetail;
}


const ExamEvent = ({event}: IExamEvent) => {
    return (
        <Link
            href={buildPath("/agenda/exam/:id/", {
                id: event.id,
            })} underline="none"
        >
            <Typography variant="body1" color="textSecondary">
                <FaStickyNote />
                {event.course.subject.name}
            </Typography>
        </Link>
    );
};

export default memo(ExamEvent);
