import {Dayjs} from "dayjs";

import {LessonDetail} from "./lesson";
import {PreferredIdType} from "./api";

export interface HomeworkApprox {
    lesson: string;
    dueDate: Dayjs;
    createdAt: Dayjs;
    id: string;

    truncatedInformation: string;
}

export interface HomeworkDetail extends Omit<HomeworkApprox, "truncatedInformation"> {
    lesson: PreferredIdType<LessonDetail>;
    isPrivate: boolean;
    information: string;
    type: string;
    userRelation: {
        completed: boolean;
        ignore: boolean;
    };
}
