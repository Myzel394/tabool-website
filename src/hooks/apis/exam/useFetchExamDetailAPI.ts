import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {ExamDetail} from "types";

import parseExam from "./parseExam";

const useFetchExamDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<ExamDetail> => {
        const {data} = await instance.get(`/api/data/exam/${id}/`, await getLoginConfig());
        await parseExam(data);

        return data;
    }, [instance]);
};

export default useFetchExamDetailAPI;
