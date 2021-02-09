import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, TeacherModificationApprox} from "types";
import getLoginConfig from "api/getLoginConfig";

import parseTeacherModificationApprox from "./parseTeacherModificationApprox";

export interface IFetchTeacherModificationData extends FetchListData {
    modificationType?: string;
    newRoomId?: string;
    newSubjectId?: string;
    newTeacherId?: string;
}

export type IFetchTeacherModificationResponse = PaginatedResponse<TeacherModificationApprox[]>;

const useFetchTeacherModificationListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        search,
        pageSize,
        modificationType,
        newRoomId,
        newSubjectId,
        newTeacherId,
    }: IFetchTeacherModificationData = {}, page = 1): Promise<IFetchTeacherModificationResponse> => {
        const {data} = await instance.get(buildUrl("/modification/"), {
            params: {
                search,
                page,
                pageSize,
                newRoom: newRoomId,
                newSubject: newSubjectId,
                newTeacher: newTeacherId,
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parseTeacherModificationApprox));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherModificationListAPI;
