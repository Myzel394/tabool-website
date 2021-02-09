import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {StudentModificationDetail} from "types";
import {getLoginConfig} from "api";

import parseStudentModificationDetail from "./parseStudentModificationDetail";

const useFetchStudentModificationDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<StudentModificationDetail> => {
        const {data} = await instance.get(buildUrl(`/modification/${id}/`), await getLoginConfig());

        await parseStudentModificationDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentModificationDetailAPI;
