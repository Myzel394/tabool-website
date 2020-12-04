import React, {memo} from "react";
import {useQuery} from "react-query";
import {useFetchLessonDataAPI, useQueryOptions} from "hooks";
import {LoadingIndicator} from "components/indicators";

export interface ILessonSelector {

}

const LessonSelector = (props: ILessonSelector) => {
    const fetchLessonData = useFetchLessonDataAPI();
    const queryOptions = useQueryOptions();

    const {data, isLoading, error} = useQuery("fetch_lesson_data", useFetchLessonDataAPI, queryOptions);

    if (isLoading) {
        return <LoadingIndicator />
    }

    // TODO: Add!

    return (

    );
};

export default memo(LessonSelector);
