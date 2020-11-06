import React, {memo} from "react";
import {useQuery} from "react-query";
import {useFetchHomeworkListAPI, useQueryOptions} from "hooks";
import {LoadingIndicator} from "components/indicators";
import dayjs from "dayjs";
import {getISODate} from "utils";

export interface IHomeworks {

}

const Homeworks = (props: IHomeworks) => {
    const date = dayjs(new Date(2020, 9, 30, 1, 1, 1));
    const queryOptions = useQueryOptions();
    const fetchHomework = useFetchHomeworkListAPI();
    const {data, isLoading, isError} = useQuery(["", {
        dueDateMin: getISODate(date),
        dueDateMax: getISODate(date),
    }], fetchHomework, queryOptions);

    if (isLoading) {
        return <LoadingIndicator isLoading>{() => <p>Element</p>}</LoadingIndicator>;
    }

    return null;
};

export default memo(Homeworks);
