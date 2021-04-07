import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherClassbook} from "types";
import getLoginConfig from "api/getLoginConfig";

import parseTeacherClassbookDetail from "./parseTeacherClassbookDetail";

export interface IUpdateTeacherClassbookData {
    presenceContent?: string | null;
    onlineContent?: string | null;
    videoConferenceLink?: string | null;
}

const useUpdateTeacherClassbookAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        onlineContent,
        presenceContent,
        videoConferenceLink,
    }: IUpdateTeacherClassbookData): Promise<TeacherClassbook> => {
        const {data} = await instance.patch(buildUrl(`/classbook/${id}/`), {
            onlineContent,
            presenceContent,
            videoConferenceLink,
        }, await getLoginConfig());

        await parseTeacherClassbookDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useUpdateTeacherClassbookAPI;
