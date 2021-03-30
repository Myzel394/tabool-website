import {useQueryString} from "hooks";
import {ErrorFieldsInjection} from "types";
import {parseQueryDate} from "utils";
import {ICreateTeacherExamData} from "hooks/apis";

export type FormikForm = ICreateTeacherExamData & ErrorFieldsInjection;


const useInitialValues = (): Partial<FormikForm> => {
    const {
        course: givenCourseId,
        date: givenDate,
        title: givenTitle,
    } = useQueryString({
        parseBooleans: false,
        parseNumbers: false,
    });

    // noinspection SuspiciousTypeOfGuard: Type can in fact have bool type
    return {
        courseId: typeof givenCourseId === "string" ? givenCourseId : undefined,
        title: typeof givenTitle === "string" ? givenTitle : undefined,
        date: parseQueryDate(givenDate) ?? undefined,
    };
};

export default useInitialValues;
