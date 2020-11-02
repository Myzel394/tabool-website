import {Dayjs} from "dayjs";

import {LessonDetail} from "./lesson";

export interface HomeworkApprox {
    lesson: string;
    dueDate: Dayjs;
    id: string;
}

export interface HomeworkDetail extends HomeworkApprox{
    lesson: LessonDetail;
    isPrivate: boolean;
    information: string;
    type: string;
    createdAt: Dayjs;
    userRelation: {
        completed: boolean;
        ignore: boolean;
    };
}
