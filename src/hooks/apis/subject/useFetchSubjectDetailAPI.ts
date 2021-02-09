import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Subject} from "types";
import {getLoginConfig} from "api";

const useFetchSubjectDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<Subject> => {
        const {data} = await instance.get(buildUrl(`/subject/${id}/`), await getLoginConfig());
        return data;
    }, [instance, buildUrl]);
};

export default useFetchSubjectDetailAPI;
