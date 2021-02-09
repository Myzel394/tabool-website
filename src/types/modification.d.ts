import {ModificationType} from "api";
import {Dayjs} from "dayjs";

import {Room} from "./room";
import {TeacherDetail} from "./teacher";
import {Subject} from "./subject";
import {StudentLessonDateMixin, TeacherLessonDateMixin} from "./lesson";

export interface StudentModificationApprox extends StudentLessonDateMixin {
    modificationType: ModificationType;
    id: string;
}

export interface StudentModificationDetail extends StudentModificationApprox {
    newRoom: Room | null;
    newSubject: Subject | null;
    newTeacher: TeacherDetail | null;
    information: string | null;
}


export interface TeacherModificationApprox extends TeacherLessonDateMixin {
    modificationType: ModificationType;
    id: string;
}

export interface TeacherModificationDetail extends TeacherModificationApprox {
    newRoom: Room | null;
    newSubject: Subject | null;
    newTeacher: TeacherDetail | null;
    information: string | null;
    createdAt: Dayjs;
}
