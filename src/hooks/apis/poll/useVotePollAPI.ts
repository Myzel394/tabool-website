import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Poll} from "types";

import parsePoll from "./parsePoll";

export interface IVotePollData {
    choicesIds: string[];

    feedback?: string | null;
}

export type IVotePollResponse = Poll;

const useVotePollAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        choicesIds,
        feedback,
    }: IVotePollData): Promise<IVotePollResponse> => {
        const {data} = await instance.post(`/api/data/poll/${id}/vote/`, {
            feedback,
            choices: choicesIds,
        }, await getLoginConfig());
        await parsePoll(data);

        return data;
    }, [instance]);
};

export default useVotePollAPI;
