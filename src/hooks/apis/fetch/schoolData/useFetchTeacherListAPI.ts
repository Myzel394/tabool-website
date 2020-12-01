import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse} from "types";
import {TeacherApprox} from "types/teacher";
import getLoginConfig from "api/getLoginConfig";

export interface IFetchTeacherListData extends FetchListData {
    ordering?: "last_name" | "-last_name" | "short_name" | "-short_name";
}

export type IFetchTeacherResponse = PaginatedResponse<TeacherApprox[]>;

const useFetchTeacherListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (search: string, {
        ordering = "last_name",
        page,
    }: IFetchTeacherListData = {}): Promise<IFetchTeacherResponse> => {
        const {data} = await instance.get("/api/data/teacher/", {
            params: {
                search,
                ordering,
                page,
            },
            ...await getLoginConfig(),
        });
        return data;
    }, [instance]);
};

export default useFetchTeacherListAPI;
