import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {PaginatedResponse, TeacherClassbook} from "types";
import getLoginConfig from "api/getLoginConfig";

import parseTeacherClassbookDetail from "./parseTeacherClassbookDetail";

export interface IFetchTeacherClassbookData {
    pageSize?: number;
}

export type IFetchTeacherClassbookResponse = PaginatedResponse<TeacherClassbook[]>;


const useFetchTeacherClassbookListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        pageSize,
    }: IFetchTeacherClassbookData = {}, page = 1): Promise<IFetchTeacherClassbookResponse> => {
        const {data} = await instance.get(buildUrl("/classbook/"), {
            params: {
                page,
                pageSize,
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parseTeacherClassbookDetail));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherClassbookListAPI;
