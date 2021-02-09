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
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        ordering = "name",
        search,
        pageSize,
    }: IFetchSubjectData = {}, page = 1): Promise<IFetchSubjectResponse> => {
        const {data} = await instance.get(buildUrl("/subject/"), {
            params: {
                search,
                ordering,
                page,
                pageSize,
            },
            ...await getLoginConfig(),
        });
        return data;
    }, [instance, buildUrl]);
};

export default useFetchSubjectListAPI;
