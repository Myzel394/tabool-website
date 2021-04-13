import {TeacherMaterialDetail} from "types";
import {UseMutateAsyncFunction, useMutation} from "react-query";
import {IUpdateTeacherMaterialData, useUpdateTeacherMaterialAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {useContext} from "react";
import update from "immutability-helper";

import StartPageContext from "../../StartPageContext";

export interface IUseQuery {
    material: TeacherMaterialDetail;
}

export interface IUseQueryResult {
    update: UseMutateAsyncFunction<TeacherMaterialDetail, AxiosError<any>, IUpdateTeacherMaterialData>;
    isLoading: boolean;
}

const useQuery = ({
    material,
}: IUseQuery): IUseQueryResult => {
    const {
        onDailyDataChange,
    } = useContext(StartPageContext);
    const updateMaterial = useUpdateTeacherMaterialAPI();
    const {addError} = useSnackbar();

    const {
        mutateAsync,
        isLoading,
    } = useMutation<TeacherMaterialDetail, AxiosError, IUpdateTeacherMaterialData>(
        (values) => updateMaterial(material.id, values),
        {
            onSuccess: newMaterial => onDailyDataChange(dailyData => update(dailyData, {
                materials: {
                    $splice: [
                        [dailyData.materials.findIndex(material => material.id === newMaterial.id), 1, newMaterial],
                    ],
                },
            })),
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );

    return {
        update: mutateAsync,
        isLoading,
    };
};

export default useQuery;
