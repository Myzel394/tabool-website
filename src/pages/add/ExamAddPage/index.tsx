import React from "react";
import {useHistory} from "react-router-dom";
import {ISendExamData, ISendExamResponse, useSendExamAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useTranslation} from "react-i18next";
import {FocusedPage} from "components";

import {buildPath} from "../../../utils";

import Form from "./Form";


const ExamAddPage = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const sendExam = useSendExamAPI();

    const {
        mutateAsync,
    } = useMutation<ISendExamResponse, AxiosError, ISendExamData>(
        sendExam,
        {
            onSuccess: (exam) => history.push(buildPath("/agenda/exam/detail/:id/", {
                id: exam.id,
            })),
        },
    );

    return (
        <FocusedPage title={t("Klassenarbeit hinzufügen")}>
            <Form
                onSubmit={(values, {setErrors, setSubmitting}) =>
                    mutateAsync(values)
                        .catch((error: AxiosError) => setErrors(error.response?.data))
                        .finally(() => setSubmitting(false))
                }
            />
        </FocusedPage>
    );
};

export default ExamAddPage;
