import {AxiosError} from "axios";
import {Dispatch, SetStateAction, useState} from "react";
import {Dayjs} from "dayjs";
import {TeacherDailyDataView} from "types";
import {useFetchTeacherDailyDataAPI} from "hooks/apis";
import {useQueryOptions} from "hooks";
import {useQuery as useReactQuery} from "react-query";


export interface IUseQuery {
    targetedDate: Dayjs;
    maxFutureDays: number;
}

export interface IUseQueryResult {
    isLoading: boolean;
    isFetching: boolean;
    error: AxiosError | null;
    dailyData?: TeacherDailyDataView;

    onDailyDataChange: Dispatch<SetStateAction<TeacherDailyDataView>>;
}

const useQuery = ({
    maxFutureDays,
    targetedDate,
}: IUseQuery): IUseQueryResult => {
    const fetchDailyData = useFetchTeacherDailyDataAPI();
    const queryOptions = useQueryOptions();

    const [dailyData, setDailyData] = useState<TeacherDailyDataView>();

    const {
        isLoading,
        isFetching,
        error,
    } = useReactQuery<TeacherDailyDataView, AxiosError>(
        ["fetch_teacher_daily_data", maxFutureDays, targetedDate],
        () => fetchDailyData({
            maxFutureDays,
            date: targetedDate,
        }),
        {
            ...queryOptions,
            refetchOnWindowFocus: false,
            onSuccess: setDailyData,
            keepPreviousData: true,
        },
    );

    return {
        isLoading,
        isFetching,
        error,
        dailyData,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: onDailyDataChange is only called after dailyData existence check
        onDailyDataChange: setDailyData,
    };
};

export default useQuery;
