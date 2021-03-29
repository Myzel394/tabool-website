import {useQueryString} from "hooks";
import {ErrorFieldsInjection} from "types";
import {parseQueryDate} from "utils";
import {ICreateStudentHomeworkData} from "hooks/apis";
import {LessonIdentifier} from "components/formik/LessonField/LessonFieldContext";

export type FormikForm = Omit<ICreateStudentHomeworkData, "lessonId" | "lessonDate"> & ErrorFieldsInjection & {
    lesson: LessonIdentifier;
};

const useInitialValues = (): Partial<FormikForm> => {
    const {
        lessonId: givenLessonId,
        lessonDate: lessonDateString,
        type: givenType,
        dueDate: dueDateString,
    } = useQueryString({
        parseBooleans: true,
        parseNumbers: false,
    });

    const lessonId = typeof givenLessonId === "string" ? givenLessonId : null;
    const lessonDate = parseQueryDate(lessonDateString);
    // noinspection SuspiciousTypeOfGuard: Type can in fact have bool type
    return {
        lesson: (lessonId && lessonDate) ? {
            date: lessonDate,
            id: lessonId,
        } : undefined,
        type: typeof givenType === "string" ? givenType : null,
        dueDate: parseQueryDate(dueDateString),
    };
};

export default useInitialValues;
