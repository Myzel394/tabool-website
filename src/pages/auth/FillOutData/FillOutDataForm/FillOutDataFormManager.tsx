import React, {memo, useCallback, useMemo} from "react";
import {useGetOptions} from "hooks";
import {useTranslation} from "react-i18next";
import {useMutation} from "react-query";
import sendFillOutData, {ISendFillOutResponse} from "api/auth/sendFillOutData";
import {LoadingIndicator} from "components/indicators";
import {LoadingOverlay} from "components/overlays";

import FillOutDataForm, {SubmitState} from "./FillOutDataForm";

export interface IFillOutDataFormManager {
    onFilledOut: (data: ISendFillOutResponse) => void;
}

const FillOutDataFormManager = ({onFilledOut}: IFillOutDataFormManager) => {
    const {t} = useTranslation();

    // Options
    const fallbackFields = useMemo(() => ({
        student: {
            classNumber: {
                label: t("Klassenstufe"),
                type: "string",
                required: true,
                readOnly: false,
                choices: [5, 6, 7, 8, 9, 10, 11, 12, 13].map(num => ({
                    value: num,
                    displayName: num.toString(),
                })),
            },
            mainTeacher: {
                label: t("Lehrer"),
                type: "string",
                required: true,
                readOnly: false,
            },
        },
        scoosodata: {
            username: {
                label: t("Scooso-Benutzername"),
                type: "string",
                required: true,
                readOnly: false,
            },
            password: {
                label: t("Scooso-Passwort"),
                type: "string",
                required: true,
                readOnly: false,
            },
        },
    }), [t]);
    const [fields, isLoading] = useGetOptions("/api/auth/full-registration/", fallbackFields);
    const [mutate, {isLoading: isSending, error}] = useMutation(sendFillOutData, {
        onSuccess: data => onFilledOut(data),
    });
    const handleFillOut = useCallback(({
        teacher,
        classNumber,
        scoosoUsername,
        scoosoPassword,
    }: SubmitState) => {
        console.log(classNumber);
        console.log(teacher);

        /* mutate({
            teacher,
            classNumber,
            scoosoUsername,
            scoosoPassword,
        });*/
    }, [mutate]);

    return (
        <LoadingIndicator isLoading={isLoading}>
            {() =>
                <LoadingOverlay isLoading={isSending}>
                    <FillOutDataForm
                        errors={error}
                        fields={fields}
                        onFillOut={handleFillOut}
                    />
                </LoadingOverlay>
            }
        </LoadingIndicator>
    );
};

export default memo(FillOutDataFormManager);
