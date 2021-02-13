import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {StudentTimetableDetail} from "types";
import {getLoginConfig} from "api";

import parseStudentTimetableDetail from "./parseStudentTimetableDetail";

const useFetchStudentCurrentTimetableAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (): Promise<StudentTimetableDetail> => {
        const {data} = await instance.get(buildUrl("/timetable/current/"), await getLoginConfig());

        await parseStudentTimetableDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentCurrentTimetableAPI;
