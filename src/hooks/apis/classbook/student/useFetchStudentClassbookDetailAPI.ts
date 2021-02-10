import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {StudentClassbook} from "types";
import {getLoginConfig} from "api";

import parseStudentClassbookDetail from "./parseStudentClassbookDetail";

const useFetchStudentClassbookDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<StudentClassbook> => {
        const {data} = await instance.get(buildUrl(`/classbook/${id}/`), await getLoginConfig());

        await parseStudentClassbookDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentClassbookDetailAPI;
