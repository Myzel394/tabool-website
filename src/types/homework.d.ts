import {Dayjs} from "dayjs";

import {LessonDetail} from "./lesson";
import {Subject} from "./subject";

export interface HomeworkApprox {
    lesson: string;
    dueDate: Dayjs;
    createdAt: Dayjs;
    subject: Subject;
    id: string;

    truncatedInformation: string;
}

export interface HomeworkDetail extends Omit<HomeworkApprox, "truncatedInformation" | "lesson" | "subject"> {
    lesson: LessonDetail;
    isPrivate: boolean;
    information: string;
    type: string | null;
    userRelation: {
        completed: boolean;
        ignore: boolean;
    };
}

export interface EditableHomeworkData {
    isPrivate: boolean;
    information: string;
    type: string;
    dueDate: Dayjs;
}

export interface HomeworkInformation {
    dueDateMin: Dayjs;
    dueDateMax: Dayjs;
    privateCount: number;
    types: string[];
    completedCount: number;
    ignoreCount: number;
}
