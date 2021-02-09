import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherModificationDetail} from "types";
import {getLoginConfig} from "api";

import parseTeacherModificationDetail from "./parseTeacherModificationDetail";

export interface IUpdateTeacherModificationData {
    modificationType?: string;

    newRoomId?: string | null;
    newSubjectId?: string | null;
    newTeacherId?: string | null;
    information?: string | null;
}

const useUpdateTeacherModificationAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        information,
        modificationType,
        newRoomId,
        newSubjectId,
        newTeacherId,
    }: IUpdateTeacherModificationData): Promise<TeacherModificationDetail> => {
        const {data} = await instance.patch(buildUrl(`/modification/${id}/`), {
            information,
            modificationType,
            newRoom: newRoomId,
            newSubject: newSubjectId,
            newTeacher: newTeacherId,
        }, await getLoginConfig());

        await parseTeacherModificationDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useUpdateTeacherModificationAPI;
