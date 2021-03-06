/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, StudentMaterialDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseStudentMaterialDetail from "./parseStudentMaterialDetail";

export interface IFetchStudentMaterialData extends FetchListData {
    ordering?: "publish_datetime" | "-publish_datetime";
    publishDatetimeMin?: Dayjs;
    publishDatetimeMax?: Dayjs;
    courseId?: string;
}

export type IFetchStudentMaterialResponse = PaginatedResponse<StudentMaterialDetail[]>;

const useFetchStudentMaterialListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        pageSize,
        courseId,
        search,
        publishDatetimeMax,
        publishDatetimeMin,
        ordering,
    }: IFetchStudentMaterialData = {}, page = 1): Promise<IFetchStudentMaterialResponse> => {
        const {data} = await instance.get(buildUrl("/material/"), {
            params: {
                page,
                pageSize,
                search,
                ordering,
                course: courseId,
                publish_datetime__gte: publishDatetimeMin ? lazyDatetime(publishDatetimeMin) : undefined,
                publish_datetime__lte: publishDatetimeMax ? lazyDatetime(publishDatetimeMax) : undefined,
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parseStudentMaterialDetail));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentMaterialListAPI;
