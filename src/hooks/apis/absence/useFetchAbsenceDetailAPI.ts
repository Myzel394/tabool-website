import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Absence} from "types";

const useFetchAbsenceListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<Absence> => {
        const {data} = await instance.get(`/api/data/lesson-absence/${id}/`, await getLoginConfig());

        return data;
    }, [instance]);
};

export default useFetchAbsenceListAPI;
