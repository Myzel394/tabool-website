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
        data = await fetchIdsToObject(data, {
            newRoom: roomId => roomId && fetchRoom(`room_${roomId}`, roomId),
            newSubject: subjectId => subjectId && fetchSubject(`subject_${subjectId}`, subjectId),
            newTeacher: teacherId => teacherId && fetchTeacher(`teacher_${teacherId}`, teacherId),
        });
        convertToDate(data, ["startDatetime", "endDatetime"]);

        return data;
    }, [fetchRoom, fetchSubject, fetchTeacher, instance]);
};

export default useFetchModificationDetailAPI;
