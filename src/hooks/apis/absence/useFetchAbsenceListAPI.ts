/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Absence, PaginatedResponse} from "types";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import {parseLessonRelatedDetail} from "../lesson";

export interface IFetchAbsenceListData {
    isSigned?: boolean;
    containsReason?: boolean;
    lessonDateMin?: Dayjs;
    lessonDateMax?: Dayjs;
}

export type IFetchAbsenceListResult = PaginatedResponse<Absence[]>;

const useFetchAbsenceListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        isSigned,
        lessonDateMax,
        lessonDateMin,
        containsReason,
    }: IFetchAbsenceListData = {}): Promise<IFetchAbsenceListResult> => {
        const {data} = await instance.get("/api/data/lesson-absence/", {
            ...await getLoginConfig(),
            params: {
                isSigned,
                lesson__date__gte: lazyDatetime(lessonDateMin, "date"),
                lesson__date__lte: lazyDatetime(lessonDateMax, "date"),
                contains_reason: containsReason,
            },
        });
        await Promise.allSettled(data.results.map(absence => parseLessonRelatedDetail(absence.lesson)));

        return data;
    }, [instance]);
};

export default useFetchAbsenceListAPI;
