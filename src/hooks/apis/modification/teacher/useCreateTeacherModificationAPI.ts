import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherModificationDetail} from "types";
import {getLoginConfig} from "api";
import {Dayjs} from "dayjs";

import parseTeacherModificationDetail from "./parseTeacherModificationDetail";

export interface ICreateTeacherModificationData {
    lessonId: string;
    lessonDate: Dayjs;
    modificationType: string;

    newRoomId?: string | null;
    newSubjectId?: string | null;
    newTeacherId?: string | null;
    information?: string | null;
}

const useCreateTeacherModificationAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        information,
        lessonDate,
        lessonId,
        modificationType,
        newRoomId,
        newSubjectId,
        newTeacherId,
    }: ICreateTeacherModificationData): Promise<TeacherModificationDetail> => {
        const {data} = await instance.post(buildUrl("/modification/"), {
            information,
            lessonDate,
            modificationType,
            newRoom: newRoomId,
            newSubject: newSubjectId,
            newTeacher: newTeacherId,
            lesson: lessonId,
        }, await getLoginConfig());

        await parseTeacherModificationDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useCreateTeacherModificationAPI;
