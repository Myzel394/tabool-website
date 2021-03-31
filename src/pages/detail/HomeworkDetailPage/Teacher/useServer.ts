import {useQueryOptions, useSnackbar} from "hooks";
import {IUpdateTeacherHomeworkData, useFetchTeacherHomeworkDetailAPI, useUpdateTeacherHomeworkAPI} from "hooks/apis";
import {QueryObserverBaseResult, UseMutateAsyncFunction, useMutation, useQuery} from "react-query";
import {TeacherHomeworkDetail} from "types";
import {AxiosError} from "axios";
import {Dispatch, SetStateAction, useState} from "react";
import {PredefinedMessageType} from "hooks/useSnackbar";
import dayjs, {Dayjs} from "dayjs";

export interface IUseServer {
    isLoading: boolean;
    isFetching: boolean;

    dataUpdatedAt: Dayjs;
    error: AxiosError | null;

    update: UseMutateAsyncFunction<TeacherHomeworkDetail, AxiosError, IUpdateTeacherHomeworkData>;
    refetch: QueryObserverBaseResult<TeacherHomeworkDetail, AxiosError>["refetch"];

    homework?: TeacherHomeworkDetail;
    updateHomework: Dispatch<SetStateAction<TeacherHomeworkDetail | undefined>>;
}

const useServer = (id: string): IUseServer => {
    const queryOptions = useQueryOptions();
    const fetchHomework = useFetchTeacherHomeworkDetailAPI();
    const updateHomework = useUpdateTeacherHomeworkAPI();
    const {addError} = useSnackbar();

    const [homework, setHomework] = useState<TeacherHomeworkDetail>();

    const {
        mutateAsync,
    } = useMutation<TeacherHomeworkDetail, AxiosError, IUpdateTeacherHomeworkData>(
        (values) => updateHomework(id, values),
        {
            onSuccess: setHomework,
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );
    const {
        isLoading,
        dataUpdatedAt,
        refetch,
        isFetching,
        error,
    } = useQuery<TeacherHomeworkDetail, AxiosError>(
        ["fetch_homework", id],
        () => fetchHomework(id),
        {
            ...queryOptions,
            onSuccess: setHomework,
        },
    );

    return {
        homework,
        isFetching,
        refetch,
        error,
        isLoading,
        updateHomework: setHomework,
        update: mutateAsync,
        dataUpdatedAt: dayjs(dataUpdatedAt),
    };
};

export default useServer;
