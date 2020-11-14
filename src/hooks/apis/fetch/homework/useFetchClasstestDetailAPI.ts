import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {ClasstestDetail} from "types";
import {convertToDate, getLoginConfig} from "api";

export const parseClasstest = (data: ClasstestDetail): void => {
    convertToDate(data, [
        "targetedDate",
        "createdAt",
    ]);
};

const useFetchClasstestDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, id: string): Promise<ClasstestDetail> => {
        const {data} = await instance.get(`/api/data/classtest/${id}/`, await getLoginConfig());
        parseClasstest(data);

        return data;
    }, [instance]);
};

export default useFetchClasstestDetailAPI;
