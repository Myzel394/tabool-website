import {useDetailPageError, useQueryOptions, useSnackbar} from "hooks";
import {
    IUpdateHomeworkUserRelationData,
    IUpdateHomeworkUserRelationResponse,
    IUpdateStudentHomeworkData,
    useFetchStudentHomeworkDetailAPI,
    useUpdateHomeworkUserRelationAPI,
    useUpdateStudentHomeworkAPI,
} from "hooks/apis";
import {useState} from "react";
import {StudentHomeworkDetail} from "types";
import {QueryObserverBaseResult, UseMutateAsyncFunction, useMutation, useQuery} from "react-query";
import {AxiosError} from "axios";
import {PredefinedMessageType} from "hooks/useSnackbar";
import update from "immutability-helper";
import {useTranslation} from "react-i18next/src";
import dayjs, {Dayjs} from "dayjs";

export interface IUseServer {
    isLoading: boolean;
    isFetching: boolean;

    dataUpdatedAt: Dayjs;
    error: AxiosError | null;

    update: UseMutateAsyncFunction<StudentHomeworkDetail, AxiosError, IUpdateStudentHomeworkData>;
    updateRelation: UseMutateAsyncFunction<IUpdateHomeworkUserRelationResponse, AxiosError, IUpdateHomeworkUserRelationData>;
    refetch: QueryObserverBaseResult<StudentHomeworkDetail, AxiosError>["refetch"];
}

const useServer = (id: string): IUseServer => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const updateHomeworkDataMutation = useUpdateStudentHomeworkAPI();
    const updateHomeworkRelationMutation = useUpdateHomeworkUserRelationAPI();
    const fetchHomework = useFetchStudentHomeworkDetailAPI();
    const {onFetchError} = useDetailPageError();
    const {addError} = useSnackbar();

    const [homework, setHomework] = useState<StudentHomeworkDetail>();

    // Server
    const {
        mutateAsync,
    } = useMutation<StudentHomeworkDetail, AxiosError, IUpdateStudentHomeworkData>(
        (values) => updateHomeworkDataMutation(id, values),
        {
            onSuccess: setHomework,
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );
    const {
        mutateAsync: mutateRelation,
    } = useMutation<IUpdateHomeworkUserRelationResponse, AxiosError, IUpdateHomeworkUserRelationData>(
        (values) => updateHomeworkRelationMutation(id, values),
        {
            onSuccess: newRelation => setHomework(prevState => update(prevState, {
                userRelation: {
                    $set: newRelation,
                },
            })),
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );
    const {
        isLoading,
        dataUpdatedAt,
        refetch,
        isFetching,
        error,
    } = useQuery<StudentHomeworkDetail, AxiosError>(
        ["fetch_homework", id],
        () => fetchHomework(id),
        {
            ...queryOptions,
            onSuccess: setHomework,
            onError: (error) => onFetchError(error, Boolean(homework), t("Diese Hausaufgabe wurde nicht gefunden")),
        },
    );

    return {
        isFetching,
        isLoading,
        refetch,
        error,
        update: mutateAsync,
        updateRelation: mutateRelation,
        dataUpdatedAt: dayjs(dataUpdatedAt),
    };
};

export default useServer;
