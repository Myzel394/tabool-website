import React, {memo} from "react";
import {ExamDetail} from "types";
import {Button, Link} from "@material-ui/core";
import {ExamIcon} from "components/icons";

import {buildPath} from "../../../../../utils";


export interface IExamEvent {
    event: ExamDetail;
}


const ExamEvent = ({event}: IExamEvent) => {
    return (
        <Link
            fullWidth
            href={buildPath("/agenda/exam/detail/:id/", {
                id: event.id,
            })}
            underline="none"
            component={Button}
            startIcon={<ExamIcon />}
            style={{
                color: event.course.subject.userRelation.color,
            }}
            size="large"
        >
            {event.course.subject.name}
        </Link>
    );
};

export default memo(ExamEvent);
