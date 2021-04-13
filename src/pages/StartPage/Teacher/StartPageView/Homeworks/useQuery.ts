import {UseMutateFunction, useMutation} from "react-query";
import {IUpdateTeacherHomeworkData, useDeleteTeacherHomeworkAPI, useUpdateTeacherHomeworkAPI} from "hooks/apis";
import {TeacherHomeworkDetail} from "types";
import {AxiosError} from "axios";
import {useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {useContext} from "react";
import update from "immutability-helper";

import StartPageContext from "../../StartPageContext";

export interface IUseQuery {
    homework: TeacherHomeworkDetail;
}

export interface IUseQueryResult {
    updateHomework: UseMutateFunction<TeacherHomeworkDetail, AxiosError, IUpdateTeacherHomeworkData, unknown>;
    isUpdateLoading: boolean;

    deleteHomework: UseMutateFunction<void, AxiosError<any>, void, unknown>;
    isDeleteLoading: boolean;
}

const useQuery = ({
    homework,
}: IUseQuery): IUseQueryResult => {
    const {
        onDailyDataChange,
    } = useContext(StartPageContext);
    const {addError} = useSnackbar();
    const updateHomework = useUpdateTeacherHomeworkAPI();
    const deleteHomework = useDeleteTeacherHomeworkAPI();

    const {
        mutate: updHomework,
        isLoading: isUpdateLoading,
    } = useMutation<TeacherHomeworkDetail, AxiosError, IUpdateTeacherHomeworkData>(
        values => updateHomework(homework.id, values),
        {
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
            onSuccess: newHomework => onDailyDataChange(dailyData => update(dailyData, {
                homeworks: {
                    $splice: [
                        [dailyData.homeworks.findIndex(hmwk => hmwk.id === homework.id), 1, newHomework],
                    ],
                },
            })),
        },
    );

    const {
        mutate: delHomework,
        isLoading: isDeleteLoading,
    } = useMutation<void, AxiosError, void>(
        () => deleteHomework(homework.id),
        {
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
            onSuccess: () => onDailyDataChange(dailyData => update(dailyData, {
                homeworks: {
                    $splice: [
                        [dailyData.homeworks.findIndex(hmwk => hmwk.id === homework.id), 1],
                    ],
                },
            })),
        },
    );

    return {
        isUpdateLoading,
        isDeleteLoading,
        updateHomework: updHomework,
        deleteHomework: delHomework,
    };
};

export default useQuery;
