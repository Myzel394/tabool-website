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

    return useCallback(async (key: string, id: string): Promise<ModificationDetail> => {
        let {data} = await instance.get(`/api/data/modification/${id}/`, await getLoginConfig());
        data = fetchIdsToObject(data, {
            newRoom: roomId => roomId && fetchRoom(`modification_${id}_${roomId}`, roomId),
            newSubject: subjectId => subjectId && fetchSubject(`modification_${id}_${subjectId}`, subjectId),
            newTeacher: teacherId => teacherId && fetchTeacher(`modification_${id}_${teacherId}`, teacherId),
        });

        convertToDate(data, ["startDatetime", "endDatetime"]);

        return data;
    }, [fetchRoom, fetchSubject, fetchTeacher, instance]);
};

export default useFetchModificationDetailAPI;
