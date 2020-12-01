/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, SubmissionApprox} from "types";
import {convertToDate, getLoginConfig} from "api";

export interface IFetchSubmissionListData extends FetchListData {
    ordering?: "upload_at" | "-upload_at" | "is_uploaded" | "-is_uploaded";
    uploadAtMin?: string;
    uploadAtMax?: string;
    isUploaded?: boolean;
    lessonId?: string;
    courseId?: string;
}

export type IFetchSubmissionListResponse = PaginatedResponse<SubmissionApprox[]>;

const useFetchSubmissionListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (search: string, {
        ordering = "is_uploaded",
        page,
        courseId,
        isUploaded,
        lessonId,
        uploadAtMax,
        uploadAtMin,
    }: IFetchSubmissionListData = {}): Promise<IFetchSubmissionListResponse> => {
        const {data} = await instance.get("/api/data/submission/", {
            params: {
                search,
                page,
                ordering,
                course: courseId,
                lesson: lessonId,
                is_uploaded: isUploaded,
                upload_at__gte: uploadAtMin,
                upload_at__lte: uploadAtMax,
            },
            ...await getLoginConfig(),
        });
        data.results.forEach(element => convertToDate(element, ["uploadAt"]));

        return data;
    }, [instance]);
};

export default useFetchSubmissionListAPI;
