import {IUpdateTeacherMaterialData, useDeleteTeacherMaterialAPI, useUpdateTeacherMaterialAPI} from "hooks/apis";
import {UseMutateAsyncFunction, useMutation} from "react-query";
import {AxiosError} from "axios";
import {TeacherMaterialDetail} from "types";
import {useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";

export interface UseUpdateData {
    id: string;
    onUpdate?: (newMaterial: TeacherMaterialDetail) => any;
    onDelete?: () => any;
}

export interface UseUpdateResponse {
    update: UseMutateAsyncFunction<TeacherMaterialDetail, AxiosError, IUpdateTeacherMaterialData>;
    isUpdating: boolean;

    delete: UseMutateAsyncFunction<void, AxiosError, void>;
    isDeleting: boolean;
}

const useUpdate = ({
    onDelete,
    onUpdate,
    id: materialId,
}: UseUpdateData): UseUpdateResponse => {
    const {
        addError,
    } = useSnackbar();
    const updateMaterial = useUpdateTeacherMaterialAPI();
    const deleteMaterial = useDeleteTeacherMaterialAPI();

    const {
        mutateAsync: updateElement,
        isLoading: isUpdating,
    } = useMutation<TeacherMaterialDetail, AxiosError, IUpdateTeacherMaterialData>(
        values => updateMaterial(materialId, values),
        {
            onSuccess: onUpdate,
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );

    const {
        mutateAsync: deleteElement,
        isLoading: isDeleting,
    } = useMutation<void, AxiosError, void>(
        () => deleteMaterial(materialId),
        {
            onSuccess: onDelete,
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );

    return {
        isUpdating,
        isDeleting,
        delete: deleteElement,
        update: updateElement,
    };
};

export default useUpdate;
