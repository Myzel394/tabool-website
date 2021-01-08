import React from "react";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {ISendHomeworkData, ISendHomeworkResponse, useSendHomeworkAPI} from "hooks/apis";
import {generatePath, useHistory} from "react-router-dom";
import {FocusedPage} from "components";
import {useTranslation} from "react-i18next";

import Form from "./Form";


const HomeworkAddPage = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const sendHomework = useSendHomeworkAPI();

    const {
        mutateAsync,
    } = useMutation<ISendHomeworkResponse, AxiosError, ISendHomeworkData>(
        sendHomework,
        {
            onSuccess: homework => history.push(generatePath("/agenda/homework/detail/:id", {
                id: homework.id,
            })),
        },
    );

    return (
        <FocusedPage title={t("Hausaufgabe hinzufügen")}>
            <Form
                onSubmit={(data, {setErrors, setSubmitting}) =>
                    mutateAsync(data)
                        .catch((error: AxiosError) => setErrors(error.response?.data))
                        .finally(() => setSubmitting(false))
                }
            />
        </FocusedPage>
    );
};


export default HomeworkAddPage;
