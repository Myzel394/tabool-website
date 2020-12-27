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

import Form from "./Form";


const HomeworkAddPage = () => {
    const sendHomework = useSendHomeworkAPI();
    const fetchTypeAutocompletion = useFetchHomeworkTypeAutocompletionAPI();
    const queryOptions = useQueryOptions();

    const {
        mutateAsync,
    } = useMutation<ISendHomeworkResponse, AxiosError, ISendHomeworkData>(
        sendHomework,
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
    const typeAutocompletion = (typeAutocompletionObjects?.results ?? []).map(element => ({
        text: element.text,
        inputValue: undefined,
    }));

    return (
        <Form
            typeAutocompletions={typeAutocompletion}
            onSubmit={(data, {setErrors, setSubmitting}) =>
                mutateAsync
                    .catch((error: AxiosError) => setErrors(error.response?.data))
                    .finally(() => setSubmitting(false))
            }
            onTypeChange={setHomeworkType}
        />
    );
};


export default memo(HomeworkAddPage);
