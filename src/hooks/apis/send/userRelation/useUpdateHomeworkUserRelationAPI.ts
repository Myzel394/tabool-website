import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {HomeworkDetail} from "types";
import {getLoginConfig} from "api";

export interface IUpdateHomeworkUserRelationData {
    completed?: boolean;
    ignore?: boolean;
    id: string;
}

export type IUpdateHomeworkUserRelationResponse = HomeworkDetail;


const useUpdateHomeworkUserRelationAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        completed,
        ignore,
        id,
    }: IUpdateHomeworkUserRelationData): Promise<IUpdateHomeworkUserRelationResponse> => {
        const {data} = await instance.put(`/api/user-relation/homework/${id}/`, {
            completed,
            ignore,
        }, await getLoginConfig());
        return data;
    }, [instance]);
};

export default useUpdateHomeworkUserRelationAPI;
