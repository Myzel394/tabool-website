import {
    TeacherHomeworkDetail,
    TeacherLessonDetail, TeacherLessonView,
    TeacherMaterialDetail,
    TeacherModificationDetail,
    TeacherSubmissionDetail,
} from "types";
import {Dayjs} from "dayjs";
import {createContext, Dispatch, SetStateAction} from "react";

export interface IRelatedObjects {
    lesson: TeacherLessonDetail;
    lessonDate: Dayjs;

    homeworks: TeacherHomeworkDetail[];
    submissions: TeacherSubmissionDetail[];
    materials: TeacherMaterialDetail[];
    modifications: TeacherModificationDetail[];

    updateLesson: Dispatch<SetStateAction<TeacherLessonView>>;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const RelatedObjectsContext = createContext<IRelatedObjects>();

export default RelatedObjectsContext;
