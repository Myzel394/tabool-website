import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {StudentHomeworkDetail} from "types";

export interface IUpdateHomeworkUserRelationData {
    completed?: boolean;
    ignored?: boolean;
}

export type IUpdateHomeworkUserRelationResponse = StudentHomeworkDetail["userRelation"];

const useUpdateHomeworkUserRelationAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        completed,
        ignored,
    }: IUpdateHomeworkUserRelationData): Promise<IUpdateHomeworkUserRelationResponse> => {
        const {data} = await instance.put(`/api/user-relation/homework/${id}/`, {
            completed,
            ignored,
        }, await getLoginConfig());
        return data;
    }, [instance]);
};

export default useUpdateHomeworkUserRelationAPI;
