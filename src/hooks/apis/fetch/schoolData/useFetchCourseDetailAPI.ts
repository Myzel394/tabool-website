import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {CourseDetail} from "types";
import {getLoginConfig} from "api";
import {fetchIdsToObject} from "utils";

import useFetchSubjectDetailAPI from "./useFetchSubjectDetailAPI";
import useFetchTeacherDetailAPI from "./useFetchTeacherDetailAPI";


const useFetchCourseDetailAPI = () => {
    const {instance} = useContext(AxiosContext);
    const fetchSubject = useFetchSubjectDetailAPI();
    const fetchTeacher = useFetchTeacherDetailAPI();

    return useCallback(async (id: string): Promise<CourseDetail> => {
        const {data} = await instance.get(`/api/data/course/${id}/`, await getLoginConfig());
        const course: CourseDetail = await fetchIdsToObject(data, {
            subject: id => fetchSubject(id),
            teacher: id => fetchTeacher(id),
        });
        course.name = `${course.subject.name}${course.courseNumber}`;

        return course;
    }, [fetchSubject, fetchTeacher, instance]);
};

export default useFetchCourseDetailAPI;
