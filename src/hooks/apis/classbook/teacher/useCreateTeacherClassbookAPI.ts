import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherClassbook} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";

import parseTeacherClassbookDetail from "./parseTeacherClassbookDetail";

export interface ICreateTeacherClassbookData {
    lessonId: string;
    lessonDate: Dayjs;

    presenceContent?: string | null;
    onlineContent?: string | null;
    videoConferenceLink?: string | null;
}

const useCreateTeacherClassbookAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        lessonDate,
        lessonId,
        onlineContent,
        presenceContent,
        videoConferenceLink,
    }: ICreateTeacherClassbookData): Promise<TeacherClassbook> => {
        const {data} = await instance.post(buildUrl("/classbook/"), {
            lessonDate,
            onlineContent,
            presenceContent,
            videoConferenceLink,
            lesson: lessonId,
        }, await getLoginConfig());

        await parseTeacherClassbookDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useCreateTeacherClassbookAPI;
