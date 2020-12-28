import React, {memo, useState} from "react";
import {useQueryOptions} from "hooks";
import {useMutation, useQuery} from "react-query";
import {AxiosError} from "axios";
import {
    IFetchHomeworkTypeAutocompletionData,
    IFetchHomeworkTypeAutocompletionResponse,
    ISendHomeworkData,
    ISendHomeworkResponse,
    useFetchHomeworkTypeAutocompletionAPI,
    useSendHomeworkAPI,
} from "hooks/apis";
import {generatePath, useHistory} from "react-router-dom";

import Form from "./Form";


const HomeworkAddPage = () => {
    const history = useHistory();
    const sendHomework = useSendHomeworkAPI();
    const fetchTypeAutocompletion = useFetchHomeworkTypeAutocompletionAPI();
    const queryOptions = useQueryOptions();

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

    // Autocompletion
    const [homeworkType, setHomeworkType] = useState<string>("");
    const {
        data: typeAutocompletionObjects,
    } = useQuery<IFetchHomeworkTypeAutocompletionResponse, AxiosError, IFetchHomeworkTypeAutocompletionData>(
        `fetch_homework_type_autocompletion_${homeworkType}`,
        () => fetchTypeAutocompletion({
            query: homeworkType,
        }),
        queryOptions,
    );
    const typeAutocompletion = (typeAutocompletionObjects?.results ?? []).map(element => element.text);


    return (
        <Form
            typeAutocompletionList={typeAutocompletion}
            onSubmit={(data, {setErrors, setSubmitting}) =>
                mutateAsync(data)
                    .catch((error: AxiosError) => setErrors(error.response?.data))
                    .finally(() => setSubmitting(false))
            }
            onTypeChange={setHomeworkType}
        />
    );
};


export default memo(HomeworkAddPage);
