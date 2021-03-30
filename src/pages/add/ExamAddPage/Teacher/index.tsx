import React from "react";
import {useTranslation} from "react-i18next/src";
import {useHistory} from "react-router-dom";
import {ICreateTeacherExamData, useCreateTeacherExamAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {TeacherExamDetail} from "types";
import {buildPath} from "utils";
import {AxiosError} from "axios";
import {useTitle} from "hooks";
import {FocusedPage} from "components";

import Form from "./Form";


const TeacherExamAddPage = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const sendExam = useCreateTeacherExamAPI();

    const {
        mutateAsync,
    } = useMutation<TeacherExamDetail, AxiosError, ICreateTeacherExamData>(
        data => sendExam(data),
        {
            onSuccess: exam => history.push(buildPath("/agenda/exam/detail/:id", {
                id: exam.id,
            })),
        },
    );

    useTitle(t("Arbeit hinzufügen"));

    return (
        <FocusedPage title={t("Arbeit hinzufügen")}>
            <Form
                onSubmit={(data, {setErrors, setSubmitting}) =>
                    mutateAsync(data)
                        .catch(error => {
                            setSubmitting(false);
                            setErrors(error.response?.data);
                        })
                }
            />
        </FocusedPage>
    );
};

export default TeacherExamAddPage;
