import {useGetTeacherCurrentLesson, useQueryString} from "hooks";
import {ErrorFieldsInjection} from "types";
import {findNextDate, parseQueryDate} from "utils";
import {ICreateTeacherHomeworkData} from "hooks/apis";
import {LessonIdentifier} from "components/formik/LessonField/LessonFieldContext";
import dayjs from "dayjs";

export type FormikForm = Omit<ICreateTeacherHomeworkData, "lessonId" | "lessonDate"> & ErrorFieldsInjection & {
    lesson: LessonIdentifier;
    isPrivate: boolean;
};

const useInitialValues = (): Partial<FormikForm> => {
    const now = dayjs();
    const currentLesson = useGetTeacherCurrentLesson();
    const {
        lessonId: givenLessonId,
        lessonDate: lessonDateString,
        type: givenType,
        dueDate: dueDateString,
        privateToStudent: givenPrivateToStudentId,
    } = useQueryString({
        parseBooleans: true,
        parseNumbers: false,
    });

    const lessonId = typeof givenLessonId === "string" ? givenLessonId : null;
    const lessonDate = parseQueryDate(lessonDateString);
    // noinspection SuspiciousTypeOfGuard: Type can in fact have bool type
    return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        lesson: ((lessonId && lessonDate) && {
            date: lessonDate,
            id: lessonId,
        }) ?? (currentLesson?.id && {
            date: findNextDate(now, currentLesson.weekday),
            id: currentLesson.id,
        }) ?? undefined,
        type: typeof givenType === "string" ? givenType : null,
        dueDate: parseQueryDate(dueDateString),
        privateToStudentId: typeof givenPrivateToStudentId === "string" ? givenPrivateToStudentId : null,
        isPrivate: typeof givenPrivateToStudentId === "string",
    };
};

export default useInitialValues;
