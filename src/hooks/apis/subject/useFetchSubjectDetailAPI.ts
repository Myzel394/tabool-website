import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Subject} from "types";
import {getLoginConfig} from "api";

const useFetchSubjectDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<Subject> => {
        const {data} = await instance.get(`/api/data/subject/${id}/`, await getLoginConfig());
        return data;
    }, [instance]);
};

export default useFetchSubjectDetailAPI;
