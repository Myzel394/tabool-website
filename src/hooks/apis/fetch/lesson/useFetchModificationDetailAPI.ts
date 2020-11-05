import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {ModificationDetail} from "types";
import {convertToDate, getLoginConfig} from "api";
import {fetchIdsToObject} from "utils";

import {useFetchRoomDetailAPI, useFetchSubjectDetailAPI, useFetchTeacherDetailAPI} from "../schoolData";


const useFetchModificationDetailAPI = () => {
    const {instance} = useContext(AxiosContext);
    const fetchRoom = useFetchRoomDetailAPI();
    const fetchSubject = useFetchSubjectDetailAPI();
    const fetchTeacher = useFetchTeacherDetailAPI();

    return useCallback(async (id: string): Promise<ModificationDetail> => {
        let {data} = await instance.get(`/api/data/modification/${id}/`, await getLoginConfig());
        data = fetchIdsToObject(data, {
            newRoom: id => id && fetchRoom(id),
            newSubject: id => id && fetchSubject(id),
            newTeacher: id => id && fetchTeacher(id),
        });

        convertToDate(data, ["startDatetime", "endDatetime"]);

        return data;
    }, [fetchRoom, fetchSubject, fetchTeacher, instance]);
};

export default useFetchModificationDetailAPI;
