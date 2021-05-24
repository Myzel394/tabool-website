import {IUpdateTeacherMaterialData, useDeleteTeacherMaterialAPI, useUpdateTeacherMaterialAPI} from "hooks/apis";
import {UseMutateAsyncFunction, useMutation} from "react-query";
import {AxiosError} from "axios";
import {TeacherMaterialDetail} from "types";
import {useContext} from "react";
import update from "immutability-helper";
import {useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";

import RelatedObjectsContext from "../../RelatedObjectsContext";

export interface UseUpdateResult {
    delete: UseMutateAsyncFunction<void, AxiosError, void>;
    update: UseMutateAsyncFunction<TeacherMaterialDetail, AxiosError, IUpdateTeacherMaterialData>;

    isUpdating: boolean;
    isDeleting: boolean;
}

const useUpdate = (materialId: string): UseUpdateResult => {
    const {
        updateLesson,
    } = useContext(RelatedObjectsContext);
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
            onSuccess: newMaterial => updateLesson(prevState => {
                const index = prevState.materials.findIndex(material => material.id === materialId);

                return update(prevState, {
                    materials: {
                        [index]: {
                            $set: newMaterial,
                        },
                    },
                });
            }),
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );

    const {
        mutateAsync: deleteElement,
        isLoading: isDeleting,
    } = useMutation<void, AxiosError, void>(
        () => deleteMaterial(materialId),
        {
            onSuccess: () => updateLesson(prevState => {
                const index = prevState.materials.findIndex(material => material.id === materialId);

                return update(prevState, {
                    materials: {
                        $splice: [
                            [index, 1],
                        ],
                    },
                });
            }),
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
