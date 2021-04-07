/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, StudentClassbook} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseStudentClassbookDetail from "./parseStudentClassbookDetail";

export interface IFetchStudentClassbookData extends FetchListData {
    ordering?: "lesson_date" | "-lesson_date";
    presenceContentContains?: string;
    onlineContentContains?: string;
    courseId?: string;
    lessonId?: string;
    lessonDate?: Dayjs;
    // Either actual video conference link (as string) or false for classbooks without a video conference link
    videoConferenceLink?: string | boolean;
}

export type IFetchStudentClassbookResponse = PaginatedResponse<StudentClassbook[]>;

const useFetchStudentClassbookListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        videoConferenceLink,
        lessonDate,
        onlineContentContains,
        lessonId,
        courseId,
        presenceContentContains,
        ordering,
        search,
        pageSize,
    }: IFetchStudentClassbookData, page = 1): Promise<IFetchStudentClassbookResponse> => {
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
                    if (videoConferenceLink === undefined) {
                        return undefined;
                    }
                    if (typeof videoConferenceLink === "boolean") {
                        return {
                            video_conference_link__isnull: videoConferenceLink,
                        };
                    }
                    return {
                        video_conference_link: videoConferenceLink,
                    };
                })()),
            },
        });

        await Promise.allSettled(data.results.map(parseStudentClassbookDetail));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentClassbookListAPI;
