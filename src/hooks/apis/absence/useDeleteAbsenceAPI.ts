import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";

const useDeleteAbsenceAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<void> => {
        const {data} = await instance.delete(`/api/data/lesson-absence/${id}/`, await getLoginConfig());

        return data;
    }, [instance]);
};

export default useDeleteAbsenceAPI;
