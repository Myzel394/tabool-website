import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Dayjs} from "dayjs";
import {convertToDate, getLoginConfig} from "api";

export interface IFetchHomeworkInformationResponse {
    dueDateMin: Dayjs;
    dueDateMax: Dayjs;
    privateCount: number;
    types: string[];
    completedCount: number;
    ignoreCount: number;
}

export const parseHomeworkInformation = (data): void => {
    convertToDate(data, [
        "dueDateMin",
        "dueDateMax",
    ]);
};

const useFetchHomeworkInformationAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (): Promise<IFetchHomeworkInformationResponse> => {
        const {data} = await instance.get("/api/data/homework/homework-information/", await getLoginConfig());

        parseHomeworkInformation(data);

        return data;
    }, [instance]);
};

export default useFetchHomeworkInformationAPI;
