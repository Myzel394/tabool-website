import React, {memo} from "react";
import {generatePath, useHistory} from "react-router-dom";
import {ISendExamData, ISendExamResponse, useSendExamAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";

import Form from "./Form";


const ExamAddPage = () => {
    const history = useHistory();
    const sendExam = useSendExamAPI();

    const {
        mutateAsync,
    } = useMutation<ISendExamResponse, AxiosError, ISendExamData>(
        sendExam,
        {
            onSuccess: (exam) => history.push(generatePath("/agenda/exam/detail/:id/", {
                id: exam.id,
            })),
        },
    );

    return (
        <Form
            onSubmit={(data, {setErrors, setSubmitting}) =>
                mutateAsync(data)
                    .catch((error: AxiosError) => setErrors(error.response?.data))
                    .finally(() => setSubmitting(false))
            }
        />
    );
};

export default memo(ExamAddPage);
