import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {PaginatedResponse} from "types";
import {Subject} from "types/subject";

export interface IFetchSubjectData {
    search: string;
    ordering?: string;
}

export type IFetchSubjectResponse = PaginatedResponse<Subject[]>;

const useFetchSubject = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        search,
        ordering = "name",
    }: IFetchSubjectData): Promise<IFetchSubjectResponse> => {
        const {data} = await instance.get("/api/data/subject/", {
            params: {
                search,
                ordering,
            },
        });
        return data;
    }, [instance]);
};

export default useFetchSubject;
