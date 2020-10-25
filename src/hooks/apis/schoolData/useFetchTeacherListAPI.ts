import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {PaginatedResponse} from "types";
import {TeacherApprox} from "types/teachers";
import getLoginData from "api/getLoginConfig";

export interface IFetchTeacherListData {
    search: string;
    ordering?: string;
}

export type IFetchTeacherResponse = PaginatedResponse<TeacherApprox[]>;

const useFetchTeacherListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {
        search,
        ordering = "lastName",
    }: IFetchTeacherListData): Promise<IFetchTeacherResponse> => {
        const {data} = await instance.get("/api/data/teacher/", {
            params: {
                search,
                ordering,
            },
            ...await getLoginData(),
        });
        return data;
    }, [instance]);
};

export default useFetchTeacherListAPI;
