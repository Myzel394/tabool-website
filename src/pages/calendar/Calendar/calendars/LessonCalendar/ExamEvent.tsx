import React, {memo} from "react";
import {ExamDetail} from "types";
import {Link, Typography} from "@material-ui/core";
import {buildPath} from "utils";
import {ExamIcon} from "components/icons";


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
                <ExamIcon />
                {event.course.subject.name}
            </Typography>
        </Link>
    );
};

export default memo(ExamEvent);
