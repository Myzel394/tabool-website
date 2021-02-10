import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {PaginatedResponse, StudentClassbook} from "types";
import getLoginConfig from "api/getLoginConfig";

import parseStudentClassbookDetail from "./parseStudentClassbookDetail";

export type IFetchStudentExamResponse = PaginatedResponse<StudentClassbook[]>;

const useFetchStudentClassbookListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (): Promise<IFetchStudentExamResponse> => {
        const {data} = await instance.get(buildUrl("/classbook/"), await getLoginConfig());

        await Promise.allSettled(data.results.map(parseStudentClassbookDetail));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentClassbookListAPI;
