import {TeacherClassbook, TeacherLessonView} from "types";
import {
    ICreateTeacherClassbookData,
    IUpdateTeacherClassbookData,
    useCreateTeacherClassbookAPI,
    useUpdateTeacherClassbookAPI,
} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useQueryOptions} from "hooks";
import {Dayjs} from "dayjs";

type TeacherLessonViewWithClassbook = TeacherLessonView & {
    classbook: TeacherClassbook;
};
type TeacherLessonViewWithoutClassbook = TeacherLessonView & {
    classbook: null;
};

interface IUseClassbookResultBase {
    isUpdating: boolean;
}

export interface IUseClassbookResultUpdate extends IUseClassbookResultBase {
    update: (values: IUpdateTeacherClassbookData) => Promise<TeacherClassbook>;
}

export interface IUseClassbookResultCreate extends IUseClassbookResultBase {
    update: (values: ICreateTeacherClassbookData) => Promise<TeacherClassbook>;
}

export default function useClassbook(lesson: TeacherLessonViewWithClassbook, date: Dayjs): IUseClassbookResultUpdate;
export default function useClassbook(lesson: TeacherLessonViewWithoutClassbook, date: Dayjs): IUseClassbookResultCreate;
export default function useClassbook(lesson: TeacherLessonView, date: Dayjs) {
    const queryOptions = useQueryOptions();
    const createClassbook = useCreateTeacherClassbookAPI();
    const updateClassbook = useUpdateTeacherClassbookAPI();
    const givenClassbook = lesson?.classbook;

    const {
        mutateAsync: createHomework,
        isLoading: isUpdatingCreate,
    } = useMutation<TeacherClassbook, AxiosError, ICreateTeacherClassbookData>(
        createClassbook,
        queryOptions,
    );

    const {
        mutateAsync: updateHomework,
        isLoading: isUpdatingUpdate,
    } = useMutation<TeacherClassbook, AxiosError, IUpdateTeacherClassbookData>(
        (values) => {
            if (givenClassbook) {
                return updateClassbook(givenClassbook.id, values);
            } else {
                throw new Error("No classbook defined");
            }
        },
        queryOptions,
    );

    return {
        update: (values) => {
            if (givenClassbook) {
                return updateHomework(values);
            } else {
                return createHomework({
                    ...values,
                    lessonId: lesson.lessonInformation.id,
                    lessonDate: date,
                });
            }
        },
        isUpdating: isUpdatingCreate || isUpdatingUpdate,
    };
}
