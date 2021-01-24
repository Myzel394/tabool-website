import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Absence, PaginatedResponse} from "types";

export interface IFetchAbsenceListData {
}

export type IFetchAbsenceListResult = PaginatedResponse<Absence>;

const useFetchAbsenceListAPI = () => {
    const {instance} = useContext(AxiosContext);

    // eslint-disable-next-line no-empty-pattern
    return useCallback(async ({}: IFetchAbsenceListData = {}): Promise<IFetchAbsenceListResult> => {
        const {data} = await instance.get("/api/data/lesson-absence/", await getLoginConfig());

        return data;
    }, [instance]);
};

export default useFetchAbsenceListAPI;
