import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {EventDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseEventDetail from "./parseEventDetail";

export interface ICreateEventData {
    lessonId: string;
    lessonDate: Dayjs;
    presenceContent: string | null;
    onlineContent: string | null;
}

const useCreateEventAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        lessonId,
        lessonDate,
        onlineContent,
        presenceContent,
    }: ICreateEventData): Promise<EventDetail> => {
        const {data} = await instance.post(buildUrl("/event/"), {
            onlineContent,
            presenceContent,
            lesson: lessonId,
            lessonDate: lazyDatetime(lessonDate, "date"),
        }, await getLoginConfig());

        await parseEventDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useCreateEventAPI;
