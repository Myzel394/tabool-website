import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {HomeworkInformation} from "types";

import parseHomeworkInformation from "./parseHomeworkInformation";

export type IFetchHomeworkInformationResponse = HomeworkInformation;

const useFetchHomeworkInformationAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (): Promise<IFetchHomeworkInformationResponse> => {
        const {data} = await instance.get("/api/data/homework/homework-information/", await getLoginConfig());

        parseHomeworkInformation(data);

        return data;
    }, [instance]);
};

export default useFetchHomeworkInformationAPI;
