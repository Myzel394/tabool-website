import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {StudentTimetableDetail} from "types";
import {getLoginConfig} from "api";

import parseStudentTimetableDetail from "./parseStudentTimetableDetail";

const useFetchStudentTimetableDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<StudentTimetableDetail> => {
        const {data} = await instance.get(buildUrl(`/timetable/${id}/`), await getLoginConfig());

        await parseStudentTimetableDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentTimetableDetailAPI;
