import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherClassbook} from "types";
import {getLoginConfig} from "api";

import parseTeacherClassbookDetail from "./parseTeacherClassbookDetail";

const useFetchTeacherClassbookDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<TeacherClassbook> => {
        const {data} = await instance.get(buildUrl(`/classbook/${id}/`), await getLoginConfig());

        await parseTeacherClassbookDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherClassbookDetailAPI;
