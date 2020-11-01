import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Course} from "types";
import {getLoginConfig} from "api";
import {fetchIdsToObject} from "utils";

import useFetchTeacherDetailAPI from "./useFetchTeacherDetailAPI";
import useFetchSubjectDetailAPI from "./useFetchSubjectDetailAPI";

const useFetchCourseDetailAPI = () => {
    const {instance} = useContext(AxiosContext);
    const fetchSubject = useFetchSubjectDetailAPI();
    const fetchTeacher = useFetchTeacherDetailAPI();

    return useCallback(async (id: string): Promise<Course> => {
        const {data} = await instance.get(`/api/data/course/${id}/`, await getLoginConfig());
        const course: Course = await fetchIdsToObject(data, {
            subject: id => fetchSubject(id),
            teacher: id => fetchTeacher(id),
        });
        course.name = `${course.subject.name}${course.courseNumber}`;

        return course;
    }, [fetchSubject, fetchTeacher, instance]);
};

export default useFetchCourseDetailAPI;
