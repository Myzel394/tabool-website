import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {PaginatedResponse} from "types";
import {Subject} from "types/subject";
import getLoginConfig from "api/getLoginConfig";

export interface IFetchSubjectData {
    search: string;
    ordering?: string;
}

export type IFetchSubjectResponse = PaginatedResponse<Subject[]>;

const useFetchSubjectListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string | undefined, {
        search,
        ordering = "name",
    }: IFetchSubjectData): Promise<IFetchSubjectResponse> => {
        const {data} = await instance.get("/api/data/subject/", {
            params: {
                search,
                ordering,
            },
            ...await getLoginConfig(),
        });
        return data;
    }, [instance]);
};

export default useFetchSubjectListAPI;
