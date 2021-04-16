import {useContext} from "react";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {getCurrentLesson} from "utils";
import {UserContext} from "contexts";
import {StudentLessonDetail, TeacherTimetableDetail} from "types";

import {useFetchTeacherCurrentTimetableAPI} from "./apis";
import useQueryOptions from "./useQueryOptions";

const useGetTeacherCurrentLesson = (): StudentLessonDetail | null => {
    const queryOptions = useQueryOptions();
    const fetchTimetable = useFetchTeacherCurrentTimetableAPI();
    const {state: user, logout} = useContext(UserContext);
    const {
        data,
    } = useQuery<TeacherTimetableDetail, AxiosError>(
        "fetch_teacher_timetable",
        fetchTimetable,
        queryOptions,
    );

    if (!user.data?.userType) {
        logout();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: This won't be called, because logout redirects user
        return null;
    }

    if (!data?.lessons?.length) {
        return null;
    }

    return getCurrentLesson(data.lessons);
};

export default useGetTeacherCurrentLesson;
