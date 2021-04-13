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
import update from "immutability-helper";
import {useContext} from "react";
import {Dayjs} from "dayjs";

import StartPageContext from "../../StartPageContext";

export interface IUseClassbookResult {
    setVideoConferenceLink: (link: string) => any;
    isUpdating: boolean;
}

const useClassbook = (
    lesson: TeacherLessonDetail,
    date: Dayjs,
    givenClassbook?: TeacherClassbook,
): IUseClassbookResult => {
    const {
        onDailyDataChange,
    } = useContext(StartPageContext);
    const queryOptions = useQueryOptions();
    const createClassbook = useCreateTeacherClassbookAPI();
    const updateClassbook = useUpdateTeacherClassbookAPI();

    const updateState = newClassbook => {
        // Update classbookWithVideoConferences
        onDailyDataChange(dailyData => {
            const index = dailyData.classbookWithVideoConferences.findIndex(classbook => classbook.id === newClassbook.id);

            if (newClassbook.videoConferenceLink) {
                if (index >= 0) {
                    // Update link
                    return update(dailyData, {
                        classbookWithVideoConferences: {
                            $splice: [
                                [index, 1, newClassbook],
                            ],
                        },
                    });
                } else {
                    // Create link
                    return update(dailyData, {
                        classbookWithVideoConferences: {
                            $push: [newClassbook],
                        },
                    });
                }
            } else if (index >= 0) {
                // Remove link
                return update(dailyData, {
                    classbookWithVideoConferences: {
                        $splice: [
                            [index, 1],
                        ],
                    },
                });
            }

            return dailyData;
        });

        // Update classbooksForLessons
        onDailyDataChange(dailyData => {
            const index = dailyData.classbooksForLessons.findIndex(classbook => classbook.id === newClassbook.id);

            if (index >= 0) {
                // Classbook exists, update it
                return update(dailyData, {
                    classbooksForLessons: {
                        $splice: [
                            [index, 1, newClassbook],
                        ],
                    },
                });
            }
            return dailyData;
        });
    };

    const {
        mutateAsync: create,
        isLoading: isUpdatingCreate,
    } = useMutation<TeacherClassbook, AxiosError, ICreateTeacherClassbookData>(
        createClassbook,
        {
            ...queryOptions,
            onSuccess: updateState,
        },
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
        {
            ...queryOptions,
            onSuccess: updateState,
        },
    );

    return {
        isUpdating: isUpdatingCreate || isUpdatingUpdate,
        setVideoConferenceLink: link => {
            if (givenClassbook) {
                return updateHomework({
                    videoConferenceLink: link,
                });
            } else if (lesson) {
                return create({
                    lessonId: lesson.id,
                    lessonDate: date,
                    videoConferenceLink: link,
                });
            } else {
                throw new Error("No lesson set.");
            }
        },
    };
};

export default useClassbook;
