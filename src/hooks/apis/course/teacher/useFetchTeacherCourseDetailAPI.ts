import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherCourseDetail} from "types";
import {getLoginConfig} from "api";

import parseTeacherCourseDetail from "./parseTeacherCourseDetail";

const useFetchTeacherCourseDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<TeacherCourseDetail> => {
        const {data} = await instance.get(buildUrl(`/course/${id}/`), await getLoginConfig());

        await parseTeacherCourseDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherCourseDetailAPI;
