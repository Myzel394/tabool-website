import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {CourseDetail} from "types";
import {getLoginConfig} from "api";

import parseCourse from "./parseCourse";


const useFetchCourseDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, id: string): Promise<CourseDetail> => {
        const {data} = await instance.get(`/api/data/course/${id}/`, await getLoginConfig());
        parseCourse(data);

        return data;
    }, [instance]);
};

export default useFetchCourseDetailAPI;
