import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, TeacherApprox} from "types";
import getLoginConfig from "api/getLoginConfig";

export interface IFetchTeacherData extends FetchListData {
}

export type IFetchTeacherResponse = PaginatedResponse<TeacherApprox[]>;

const useFetchTeacherListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        pageSize,
        search,
    }: IFetchTeacherData = {}, page = 1): Promise<IFetchTeacherResponse> => {
        const {data} = await instance.get(buildUrl("/teacher/"), {
            params: {
                page,
                pageSize,
                search,
            },
            ...await getLoginConfig(),
        });

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherListAPI;
