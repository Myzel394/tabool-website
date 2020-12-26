import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {TeacherDetail} from "types";

export interface IFetchContactsResponse {
    illnessReportEmail: string;
    mainTeacher: TeacherDetail;
}

const useFetchContactsAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (): Promise<IFetchContactsResponse> => {
        const {data} = await instance.get("/api/data/contacts/", await getLoginConfig());
        return data;
    }, [instance]);
};

export default useFetchContactsAPI;
