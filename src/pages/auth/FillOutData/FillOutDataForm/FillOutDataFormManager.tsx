import React, {memo, useCallback} from "react";
import {useSendFillOutDataAPI} from "hooks";
import {useMutation} from "react-query";
import {LoadingOverlay} from "components/overlays";
import {IFillOutDataResponse} from "hooks/apis/send/useSendFillOutDataAPI";

import FillOutDataForm, {SubmitState} from "./FillOutDataForm";

export interface IFillOutDataFormManager {
    onFilledOut: (data: IFillOutDataResponse) => void;
}

const FillOutDataFormManager = ({onFilledOut}: IFillOutDataFormManager) => {
    const sendFillOutData = useSendFillOutDataAPI();
    const [mutate, {isLoading: isSending, error}] = useMutation(sendFillOutData, {
        onSuccess: data => onFilledOut(data),
    });
    const handleFillOut = useCallback(({
        teacher,
        classNumber,
        scoosoUsername,
        scoosoPassword,
    }: SubmitState) => {
        mutate({
            mainTeacher: teacher.id,
            classNumber,
            scoosoUsername,
            scoosoPassword,
        });
    }, [mutate]);

    return (
        <LoadingOverlay isLoading={isSending}>
            <FillOutDataForm
                errors={error?.response?.data}
                onFillOut={handleFillOut}
            />
        </LoadingOverlay>
    );
};

export default memo(FillOutDataFormManager);
