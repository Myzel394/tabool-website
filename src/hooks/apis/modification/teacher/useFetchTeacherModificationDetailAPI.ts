import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherModificationDetail} from "types";
import {getLoginConfig} from "api";

import parseTeacherModificationDetail from "./parseTeacherModificationDetail";

const useFetchTeacherModificationDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<TeacherModificationDetail> => {
        const {data} = await instance.get(buildUrl(`/modification/${id}/`), await getLoginConfig());

        await parseTeacherModificationDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherModificationDetailAPI;
