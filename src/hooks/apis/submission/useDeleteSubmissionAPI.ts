import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";

const useDeleteSubmissionAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<void> => {
        await instance.delete(`/api/data/submission/${id}/`, await getLoginConfig());

    }, [instance]);
};

export default useDeleteSubmissionAPI;
