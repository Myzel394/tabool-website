import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {SubmissionDetail} from "types";
import {convertToDate, getLoginConfig} from "api";

import {parseLesson} from "../lesson";

export const parseSubmission = (data: SubmissionDetail): void => {
    convertToDate(data, [
        "uploadAt",
    ]);
    parseLesson(data.lesson);
};

const useFetchSubmissionDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, id: string): Promise<SubmissionDetail> => {
        const {data} = await instance.get(`/api/data/submission/${id}/`, await getLoginConfig());
        parseSubmission(data);

        return data;
    }, [instance]);
};

export default useFetchSubmissionDetailAPI;
