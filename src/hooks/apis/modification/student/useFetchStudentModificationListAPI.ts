import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, StudentModificationApprox} from "types";
import getLoginConfig from "api/getLoginConfig";

import parseStudentModificationApprox from "./parseStudentModificationApprox";

export interface IFetchStudentModificationData extends FetchListData {
    modificationType?: string;
    newRoomId?: string;
    newSubjectId?: string;
    newTeacherId?: string;
}

export type IFetchStudentModificationResponse = PaginatedResponse<StudentModificationApprox[]>;

const useFetchStudentModificationListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        search,
        pageSize,
        modificationType,
        newRoomId,
        newSubjectId,
        newTeacherId,
    }: IFetchStudentModificationData = {}, page = 1): Promise<IFetchStudentModificationResponse> => {
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

        await Promise.allSettled(data.results.map(parseStudentModificationApprox));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentModificationListAPI;
