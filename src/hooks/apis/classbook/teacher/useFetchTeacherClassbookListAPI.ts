/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, TeacherClassbook} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseTeacherClassbookDetail from "./parseTeacherClassbookDetail";

export interface IFetchTeacherClassbookData extends FetchListData {
    ordering?: "lesson_date" | "-lesson_date";
    presenceContentContains?: string;
    onlineContentContains?: string;
    courseId?: string;
    lessonId?: string;
    lessonDate?: Dayjs;
    videoConferenceLink?: string;
    containsVideoConferenceLink?: boolean;
}

export type IFetchTeacherClassbookResponse = PaginatedResponse<TeacherClassbook[]>;


const useFetchTeacherClassbookListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        pageSize,
        lessonDate,
        lessonId,
        onlineContentContains,
        presenceContentContains,
        videoConferenceLink,
        courseId,
        ordering,
        search,
        containsVideoConferenceLink,
    }: IFetchTeacherClassbookData = {}, page = 1): Promise<IFetchTeacherClassbookResponse> => {
        const {data} = await instance.get(buildUrl("/classbook/"), {
            ...await getLoginConfig(),
            params: {
                page,
                pageSize,
                search,
                ordering,
                presence_content__trigram_similar: presenceContentContains ? presenceContentContains : undefined,
                online_content__trigram_similar: onlineContentContains ? onlineContentContains : undefined,
                course: courseId ? courseId : undefined,
                lesson: lessonId ? lessonId : undefined,
                lesson_date: lessonDate ? lazyDatetime(lessonDate, "date") : undefined,
                ...((() => {
                    if (typeof containsVideoConferenceLink === "boolean") {
                        return {
                            video_conference_link__isnull: !containsVideoConferenceLink,
                        };
                    }

                    if (typeof containsVideoConferenceLink === "string") {
                        return {
                            video_conference_link: videoConferenceLink,
                        };
                    }

                    return undefined;
                })()),
            },
        });

        await Promise.allSettled(data.results.map(parseTeacherClassbookDetail));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherClassbookListAPI;
