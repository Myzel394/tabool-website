import React, {memo} from "react";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {ISendHomeworkData, ISendHomeworkResponse, useSendHomeworkAPI} from "hooks/apis";
import {generatePath, useHistory} from "react-router-dom";

import Form from "./Form";


const HomeworkAddPage = () => {
    const history = useHistory();
    const sendHomework = useSendHomeworkAPI();

    const {
        mutateAsync,
    } = useMutation<ISendHomeworkResponse, AxiosError, ISendHomeworkData>(
        sendHomework,
        {
            onSuccess: (homework) => history.push(generatePath("/homework/detail/:id", {
                id: homework.id,
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


export default memo(HomeworkAddPage);
