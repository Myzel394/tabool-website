import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherDetail} from "types";
import {getLoginConfig} from "api";

const useFetchTeacherDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<TeacherDetail> => {
        const {data} = await instance.get(buildUrl(`/teacher/${id}/`), await getLoginConfig());

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherDetailAPI;
