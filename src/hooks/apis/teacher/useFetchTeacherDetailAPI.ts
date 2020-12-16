import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherDetail} from "types";
import {getLoginConfig} from "api";

const useFetchTeacherDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, id: string): Promise<TeacherDetail> => {
        const {data} = await instance.get(`/api/data/teacher/${id}/`, await getLoginConfig());
        return data;
    }, [instance]);
};

export default useFetchTeacherDetailAPI;
