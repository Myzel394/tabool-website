import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Subject} from "types";

export interface ISendSubjectRelationData {
    color: string;
}

const useSendHomeworkAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        color,
    }: ISendSubjectRelationData): Promise<Subject> => {
        const {data} = await instance.post(buildUrl(`/subject/${id}/`), {
            color,
        }, await getLoginConfig());

        return data;
    }, [instance, buildUrl]);
};

export default useSendHomeworkAPI;
