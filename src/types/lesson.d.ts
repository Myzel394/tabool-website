/* eslint-disable import/no-cycle */
import {Dayjs} from "dayjs";
import {ModificationDetail} from "api";

import {Room} from "./room";
import {CourseDetail} from "./course";
import {Classbook} from "./classbook";
import {MaterialDetail} from "./material";
import {HomeworkDetail} from "./homework";
import {SubmissionDetail} from "./submission";
import {Absence} from "./absence";

export interface LessonDataApprox {
    course: string;
    startTime: Dayjs;
    endTime: Dayjs;
    weekday: number;
    id: string;
}

export interface LessonDataDetail extends Omit<LessonDataApprox, "course" | "room"> {
    course: CourseDetail;
    room: Room;
    hasConference: boolean;
}


export interface LessonApprox {
    lessonData: LessonDataApprox;
    date: Dayjs;
    hasConference: boolean;
    id: string;
}

export interface LessonRelatedDetail extends Omit<LessonApprox, "lessonData" | "hasConference"> {
    lessonData: LessonDataDetail;
    classbook: Classbook | null;
    videoConferenceLink?: string;
}

export interface LessonDetail extends LessonRelatedDetail {
    materials: MaterialDetail[];
    homeworks: HomeworkDetail[];
    modifications: ModificationDetail[];
    submissions: SubmissionDetail[];
    absence?: Absence;
}

