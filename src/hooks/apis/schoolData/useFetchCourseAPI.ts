import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Course, PaginatedResponse} from "types";

export interface IFetchCourseData {
    id: string;
}

export type IFetchCourseResponse = PaginatedResponse<Course>;

const useFetchCourseAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({id}: IFetchCourseData): Promise<IFetchCourseResponse> => {
        const {data} = await instance.get(`/api/data/course/${id}/`);
        return data;
    }, [instance]);
};

export default useFetchCourseAPI;
