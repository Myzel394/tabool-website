import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {CourseDetail} from "types";
import {getLoginConfig} from "api";

export const parseCourse = (data: CourseDetail): void => {
    data.name = `${data.subject.name}${data.courseNumber}`;
};


const useFetchCourseDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, id: string): Promise<CourseDetail> => {
        const {data} = await instance.get(`/api/data/course/${id}/`, await getLoginConfig());
        parseCourse(data);

        return data;
    }, [instance]);
};

export default useFetchCourseDetailAPI;
