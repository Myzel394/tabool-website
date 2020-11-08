import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse} from "types";
import {Subject} from "types/subject";
import getLoginConfig from "api/getLoginConfig";

export interface IFetchSubjectData extends FetchListData {
    ordering?: "name" | "-name" | "short_name" | "-short_name";
}

export type IFetchSubjectResponse = PaginatedResponse<Subject[]>;

const useFetchSubjectListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {
        ordering = "name",
        page,
        search,
    }: IFetchSubjectData = {}): Promise<IFetchSubjectResponse> => {
        const {data} = await instance.get("/api/data/subject/", {
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

export default useFetchSubjectListAPI;
