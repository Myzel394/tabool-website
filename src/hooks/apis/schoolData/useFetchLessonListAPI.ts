import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {DayJS} from "dayjs";


export interface IFetchLessonListData {
    startDate: DayJS;
    endDate: DayJS;
}

export interface IFetchLessonListResponse {}

const useFetchLessonListAPI = async () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {
        startDate,
        endDate
    }: IFetchLessonListData): IFetchLessonListResponse => {
        const {data} = await instance.get("/api/data/lesson/", {
            params: {
                "start_date__gte": startDate,
                "end_date__lte": endDate
            }
        })
        return data;
    }, [instance]);
}

export default useFetchLessonListAPI;
