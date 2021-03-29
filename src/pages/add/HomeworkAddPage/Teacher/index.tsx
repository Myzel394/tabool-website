import React from "react";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {ICreateTeacherHomeworkData, useCreateTeacherHomeworkAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {TeacherHomeworkDetail} from "types";
import {AxiosError} from "axios";
import {buildPath} from "utils";
import {useTitle} from "hooks";
import {FocusedPage} from "components";

import Form from "./Form";


const TeacherHomeworkAddPage = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const sendHomework = useCreateTeacherHomeworkAPI();

    const {
        mutateAsync,
    } = useMutation<TeacherHomeworkDetail, AxiosError, ICreateTeacherHomeworkData>(
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
                onSubmit={async (data, {setErrors, setSubmitting, setFieldValue}) => {
                    if (data.isPrivate && !data.privateToStudentId) {
                        setFieldValue("isPrivate", false);
                    }

                    try {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore: I don't know
                        await mutateAsync({
                            dueDate: data.dueDate,
                            information: data.information,
                            lessonDate: data.lesson.date,
                            lessonId: data.lesson.id,
                            type: data.type,
                            privateToStudentId: data.isPrivate ? data.privateToStudentId : null,
                        });
                    } catch (error) {
                        setSubmitting(false);
                        setErrors(error.response?.data);
                    }
                }}
            />
        </FocusedPage>
    );
};

export default TeacherHomeworkAddPage;
