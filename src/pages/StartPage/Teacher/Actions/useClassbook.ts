import {TeacherClassbook, TeacherLessonDetail} from "types";
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

export interface IUseClassbook {
    associatedLesson: TeacherLessonDetail;
    targetedDate: Dayjs;
    onSuccess: (classbook: TeacherClassbook) => any;
    givenClassbook?: TeacherClassbook;
}

export interface IUseClassbookResult {
    setVideoConferenceLink: (link: string) => any;
}

const useClassbook = ({
    givenClassbook,
    associatedLesson,
    targetedDate,
    onSuccess,
}: IUseClassbook): IUseClassbookResult => {
    const queryOptions = useQueryOptions();
    const createClassbook = useCreateTeacherClassbookAPI();
    const updateClassbook = useUpdateTeacherClassbookAPI();

    const {
        mutateAsync: create,
        isLoading: isLoadingCreate,
    } = useMutation<TeacherClassbook, AxiosError, ICreateTeacherClassbookData>(
        createClassbook,
        {
            ...queryOptions,
            onSuccess,
        },
    );

    const {
        mutateAsync: update,
        isLoading: isLoadingUpdate,
    } = useMutation<TeacherClassbook, AxiosError, IUpdateTeacherClassbookData>(
        (values) => {
            if (givenClassbook) {
                return updateClassbook(givenClassbook.id, values);
            } else {
                throw new Error();
            }
        },
        {
            ...queryOptions,
            onSuccess,
        },
    );

    return {
        setVideoConferenceLink: link => {
            if (givenClassbook) {
                return update({
                    videoConferenceLink: link,
                });
            } else {
                return create({
                    lessonId: associatedLesson.id,
                    lessonDate: targetedDate,
                    videoConferenceLink: link,
                });
            }
        },
    };
};

export default useClassbook;
