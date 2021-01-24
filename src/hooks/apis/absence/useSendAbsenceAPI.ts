import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Absence} from "types";

export interface ISendAbsenceData {
    lessonId: string;
    reason?: string;
    isSigned?: boolean;
}

const useSendAbsenceAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        lessonId,
        isSigned,
        reason,
    }: ISendAbsenceData): Promise<Absence> => {
        const {data} = await instance.post("/api/data/lesson-absence/", {
            lesson: lessonId,
            isSigned,
            reason,
        }, await getLoginConfig());

        return data;
    }, [instance]);
};

export default useSendAbsenceAPI;
