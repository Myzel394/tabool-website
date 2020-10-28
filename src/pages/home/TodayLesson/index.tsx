import React, {memo} from "react";
import {useQuery} from "react-query";
import {useFetchLessonListAPI, useQueryOptions} from "hooks";
import dayjs from "dayjs";
import {LoadingIndicator} from "components/indicators";
import {useMemoOne} from "use-memo-one";
import {getISODate} from "utils";

export interface ITodayLessonManager {

}

const TodayLessonManager = (props: ITodayLessonManager) => {
    const today = useMemoOne(() => dayjs(), []);
    const queryFunction = useFetchLessonListAPI();
    const queryOptions = useQueryOptions();
    const {isLoading, isError, data} = useQuery(["today_lesson", {
        startDate: getISODate(today),
        endDate: getISODate(today),
    }], queryFunction, queryOptions);

    console.log(data);

    return (
        <LoadingIndicator isLoading={isLoading}>
            {() =>
                <p>jaa</p>
            }
        </LoadingIndicator>
    );
};

export default memo(TodayLessonManager);
