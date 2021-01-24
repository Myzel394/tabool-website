import {Absence, LessonDetail} from "types";
import {IUpdateAbsenceData, useDeleteAbsenceAPI, useSendAbsenceAPI, useUpdateAbsenceAPI} from "hooks/apis";
import {UseMutateAsyncFunction, useMutation} from "react-query";
import {AxiosError} from "axios";
import {useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";

export interface IUseAbsenceResult {
    add: UseMutateAsyncFunction<Absence, AxiosError, void>;
    update: (values: IUpdateAbsenceData) => Promise<Absence>;
    remove: UseMutateAsyncFunction<void, AxiosError, void>;
}

const useAbsence = (onChange: (newValue: Absence | null) => void, lesson?: LessonDetail): IUseAbsenceResult => {
    const addAbsence = useSendAbsenceAPI();
    const deleteAbsence = useDeleteAbsenceAPI();
    const updateAbsence = useUpdateAbsenceAPI();
    const {addError} = useSnackbar();

    const {mutateAsync: add} = useMutation<Absence, AxiosError, void>(
        () => {
            if (!lesson) {
                throw new TypeError("Lesson not loaded");
            }

            if (lesson.absence) {
                throw new TypeError("Absence already exists");
            }

            return addAbsence({
                lessonId: lesson.id,
            });
        },
        {
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
            onSuccess: onChange,
        },
    );
    const {mutateAsync: remove} = useMutation<void, AxiosError, void>(
        () => {
            if (!lesson) {
                throw new TypeError("Lesson not loaded");
            }

            if (!lesson.absence?.id) {
                throw new TypeError("Absence does not exist");
            }

            return deleteAbsence(lesson.absence.id);
        },
        {
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
            onSuccess: () => onChange(null),
        },
    );
    const {mutateAsync: update} = useMutation<Absence, AxiosError, IUpdateAbsenceData>(
        values => {
            if (!lesson) {
                throw new TypeError("Lesson not loaded");
            }

            if (!lesson.absence?.id) {
                throw new TypeError("Absence does not exist");
            }

            return updateAbsence(lesson.absence.id, values);
        },
        {
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
            onSuccess: onChange,
        },
    );

    return {
        add,
        remove,
        update,
    };
};

export default useAbsence;
