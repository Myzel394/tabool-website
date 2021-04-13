import {TeacherClassbook} from "types";
import {
    ICreateTeacherClassbookData,
    IFetchTeacherClassbookResponse,
    IUpdateTeacherClassbookData,
    useCreateTeacherClassbookAPI,
    useFetchTeacherClassbookListAPI,
    useUpdateTeacherClassbookAPI,
} from "hooks/apis";
import {useMutation, useQuery} from "react-query";
import {AxiosError} from "axios";
import {useQueryOptions} from "hooks";
import update from "immutability-helper";
import {useContext, useState} from "react";

import StartPageContext from "../../StartPageContext";

export interface IUseClassbookResult {
    setVideoConferenceLink: (link: string) => any;
    isUpdating: boolean;

    isLoading: boolean;
    isError: boolean;
    loadAll: boolean;
    classbooks?: TeacherClassbook[];
}

const useClassbook = (): IUseClassbookResult => {
    const {
        dailyData,
        onDailyDataChange,
        selectedLesson,
        date,
    } = useContext(StartPageContext);
    const queryOptions = useQueryOptions();
    const createClassbook = useCreateTeacherClassbookAPI();
    const updateClassbook = useUpdateTeacherClassbookAPI();
    const fetchClassbooks = useFetchTeacherClassbookListAPI();
    const givenClassbook = selectedLesson && dailyData.classbooksForLessons.find(classbook => classbook.lesson.id === selectedLesson.id);

    const [loadAll, setLoadAll] = useState<boolean>(false);

    const updateState = newClassbook => {
        const index = dailyData.classbooksForLessons.findIndex(classbook => classbook.id === newClassbook.id);

        onDailyDataChange(dailyData => update(dailyData, {
            classbooksForLessons: {
                $splice: [
                    [index, 1, newClassbook],
                ],
            },
        }));

        if (newClassbook.videoConferenceLink) {
            onDailyDataChange(dailyData => {
                const index = dailyData.classbookWithVideoConferences.findIndex(classbook => classbook.id === newClassbook.id);

                if (index >= 0) {
                    return update(dailyData, {
                        classbookWithVideoConferences: {
                            $splice: [
                                [index, 1, newClassbook],
                            ],
                        },
                    });
                } else {
                    return update(dailyData, {
                        classbookWithVideoConferences: {
                            $push: [
                                newClassbook,
                            ],
                        },
                    });
                }
            });
        }
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

    const {
        data,
        isLoading,
        isError,
    } = useQuery<IFetchTeacherClassbookResponse, AxiosError>(
        ["fetch_classbooks_with_video_conference_link", loadAll],
        () => fetchClassbooks({
            containsVideoConferenceLink: true,
            courseId: loadAll ? undefined : selectedLesson?.course?.id,
            ordering: "-lesson_date",
        }),
        {
            ...queryOptions,
            onSuccess: results => {
                // If no classbooks available, there are maybe some when loading all
                if (!results.results.length) {
                    setLoadAll(true);
                }
            },
        },
    );

    return {
        isLoading,
        isError,
        loadAll,
        isUpdating: isUpdatingCreate || isUpdatingUpdate,
        classbooks: data?.results,
        setVideoConferenceLink: link => {
            if (givenClassbook) {
                return updateHomework({
                    videoConferenceLink: link,
                });
            } else if (selectedLesson) {
                return create({
                    lessonId: selectedLesson.id,
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
