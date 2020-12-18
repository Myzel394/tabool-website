import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {SubmissionDetail} from "types";
import {getLoginConfig} from "api";

import parseSubmission from "./parseSubmission";

const useFetchSubmissionDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<SubmissionDetail> => {
        const {data} = await instance.get(`/api/data/submission/${id}/`, await getLoginConfig());
        await parseSubmission(data);

        return data;
    }, [instance]);
};

export default useFetchSubmissionDetailAPI;
