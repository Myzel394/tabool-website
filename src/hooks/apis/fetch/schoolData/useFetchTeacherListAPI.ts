import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {PaginatedResponse} from "types";
import {TeacherApprox} from "types/teacher";
import getLoginConfig from "api/getLoginConfig";

export interface IFetchTeacherListData {
    ordering?: string;
}

export type IFetchTeacherResponse = PaginatedResponse<TeacherApprox[]>;

const useFetchTeacherListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (search: string, {
        ordering = "lastName",
    }: IFetchTeacherListData = {}): Promise<IFetchTeacherResponse> => {
        const {data} = await instance.get("/api/data/teacher/", {
            params: {
                search,
                ordering,
            },
            ...await getLoginConfig(),
        });
        return data;
    }, [instance]);
};

export default useFetchTeacherListAPI;
