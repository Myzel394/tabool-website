import React from "react";
import {FocusedPage} from "components";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {ICreateStudentHomeworkData, useCreateStudentHomeworkAPI} from "hooks/apis";
import {StudentHomeworkDetail} from "types";
import {AxiosError} from "axios";
import {useMutation} from "react-query";
import {buildPath} from "utils";
import {useTitle} from "hooks";

import Form from "./Form";


const StudentHomeworkAddPage = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const sendHomework = useCreateStudentHomeworkAPI();

    const {
        mutateAsync,
    } = useMutation<StudentHomeworkDetail, AxiosError, ICreateStudentHomeworkData>(
        data => sendHomework(data),
        {
            onSuccess: homework => history.push(buildPath("/agenda/homework/detail/:id", {
                id: homework.id,
            })),
        },
    );

    useTitle(t("Hausaufgabe hinzufügen"));

    return (
        <FocusedPage title={t("Hausaufgabe hinzufügen")}>
            <Form
                onSubmit={(data, {setErrors, setSubmitting}) =>
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore: I don't know
                    mutateAsync({
                        dueDate: data.dueDate,
                        information: data.information,
                        lessonDate: data.lesson.date,
                        lessonId: data.lesson.id,
                        type: data.type,
                    })
                        .catch((error: AxiosError) => {
                            setSubmitting(false);
                            setErrors(error.response?.data);
                        })
                }
            />
        </FocusedPage>
    );
};

export default StudentHomeworkAddPage;
