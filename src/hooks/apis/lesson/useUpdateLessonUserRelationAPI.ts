import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {LessonDetail} from "types";
import {getLoginConfig} from "api";

export interface IUpdateLessonUserRelationData {
    attendance: boolean;
}

export type IUpdateLessonUserRelationResponse = LessonDetail["userRelation"];

const useUpdateLessonUserRelationAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        attendance,
    }: IUpdateLessonUserRelationData): Promise<IUpdateLessonUserRelationResponse> => {
        const {data} = await instance.put(`/api/user-relation/lesson/${id}/`, {
            attendance,
        }, await getLoginConfig());
        return data;
    }, [instance]);
};

export default useUpdateLessonUserRelationAPI;
