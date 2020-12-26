import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, TeacherApprox} from "types";
import {getLoginConfig} from "api";

export interface IFetchTeacherListData extends FetchListData {
    ordering?: "last_name" | "-last_name" | "short_name" | "-short_name";
}

export type IFetchTeacherResponse = PaginatedResponse<TeacherApprox[]>;

const useFetchTeacherListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {
        ordering = "last_name",
        search,
    }: IFetchTeacherListData = {}, page = 1): Promise<IFetchTeacherResponse> => {
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
