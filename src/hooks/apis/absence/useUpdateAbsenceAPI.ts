import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Absence} from "types";

export interface IUpdateAbsenceData {
    reason?: string;
    isSigned?: boolean;
}

const useUpdateAbsenceAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        isSigned,
        reason,
    }: IUpdateAbsenceData): Promise<Absence> => {
        const {data} = await instance.patch(`/api/data/lesson-absence/${id}/`, {
            isSigned,
            reason,
        }, await getLoginConfig());

        return data;
    }, [instance]);
};

export default useUpdateAbsenceAPI;
