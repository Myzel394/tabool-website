import {useContext} from "react";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {getCurrentLesson} from "utils";
import {UserContext} from "contexts";
import {StudentLessonDetail, StudentTimetableDetail} from "types";

import {useFetchStudentCurrentTimetableAPI} from "./apis";
import useQueryOptions from "./useQueryOptions";

const useGetStudentCurrentLesson = (): StudentLessonDetail | null => {
    const queryOptions = useQueryOptions();
    const fetchTimetable = useFetchStudentCurrentTimetableAPI();
    const {state: user, logout} = useContext(UserContext);
    const {
        data,
    } = useQuery<StudentTimetableDetail, AxiosError>(
        "fetch_student_timetable",
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

export default useGetStudentCurrentLesson;
