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

    return useCallback(async (key: string, id: string): Promise<CourseDetail> => {
        const {data} = await instance.get(`/api/data/course/${id}/`, await getLoginConfig());
        const course: CourseDetail = await fetchIdsToObject(data, {
            subject: subjectId => fetchSubject(`subject_${subjectId}`, subjectId),
            teacher: teacherId => fetchTeacher(`teacher_${teacherId}`, teacherId),
        });
        course.name = `${course.subject.name}${course.courseNumber}`;

        return course;
    }, [fetchSubject, fetchTeacher, instance]);
};

export default useFetchCourseDetailAPI;
