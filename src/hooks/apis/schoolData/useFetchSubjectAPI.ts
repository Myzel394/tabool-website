import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {PaginatedResponse} from "types";
import {Subject} from "types/subject";

import getLoginData from "api/getLoginConfig";

export interface IFetchSubjectData {
    search: string;
    ordering?: string;
}

export type IFetchSubjectResponse = PaginatedResponse<Subject[]>;

const useFetchSubjectAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {
        search,
        ordering = "name",
    }: IFetchSubjectData): Promise<IFetchSubjectResponse> => {
        const {data} = await instance.get("/api/data/subject/", {
            params: {
                search,
                ordering,
            },
            ...await getLoginData(),
        });
        return data;
    }, [instance]);
};

export default useFetchSubjectAPI;
