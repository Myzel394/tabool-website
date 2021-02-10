/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, TeacherMaterialDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";

import parseTeacherMaterialDetail from "./parseTeacherMaterialDetail";

export interface IFetchTeacherMaterialData extends FetchListData {
    publishDatetimeMin?: Dayjs;
    publishDatetimeMax?: Dayjs;
    courseId?: string;
    announce?: boolean;
}

export type IFetchTeacherMaterialResponse = PaginatedResponse<TeacherMaterialDetail[]>;

const useFetchTeacherMaterialListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        pageSize,
        courseId,
        search,
        announce,
        publishDatetimeMax,
        publishDatetimeMin,
    }: IFetchTeacherMaterialData = {}, page = 1): Promise<IFetchTeacherMaterialResponse> => {
        const {data} = await instance.get(buildUrl("/material/"), {
            params: {
                page,
                pageSize,
                search,
                announce,
                course: courseId,
                publish_datetime__gte: publishDatetimeMin,
                publish_datetime__lte: publishDatetimeMax,
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parseTeacherMaterialDetail));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherMaterialListAPI;
