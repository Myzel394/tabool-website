import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import getLoginConfig from "api/getLoginConfig";


const useDeleteTeacherClassbookAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<void> => {
        const {data} = await instance.delete(buildUrl(`/classbook/${id}/`), await getLoginConfig());

        return data;
    }, [instance, buildUrl]);
};

export default useDeleteTeacherClassbookAPI;
