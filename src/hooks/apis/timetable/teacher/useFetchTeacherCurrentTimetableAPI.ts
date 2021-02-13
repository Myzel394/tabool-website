import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherTimetableDetail} from "types";
import {getLoginConfig} from "api";

import parseTeacherTimetableDetail from "./parseTeacherTimetableDetail";

const useFetchTeacherCurrentTimetableAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (): Promise<TeacherTimetableDetail> => {
        const {data} = await instance.get(buildUrl("/timetable/current/"), await getLoginConfig());

        await parseTeacherTimetableDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherCurrentTimetableAPI;
