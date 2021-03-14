import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Subject} from "types";

export interface IUpdateSubjectRelationData {
    color: string;
}

const useUpdateHomeworkAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        color,
    }: IUpdateSubjectRelationData): Promise<Subject["userRelation"]> => {
        const {data} = await instance.patch(`/api/user-relation/subject/${id}/`, {
            color,
        }, await getLoginConfig());

        return data;
    }, [instance]);
};

export default useUpdateHomeworkAPI;
