import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router";
import {useMutation, useQuery} from "react-query";
import {AxiosError} from "axios";
import {useQueryOptions} from "hooks";
import {IUpdateTeacherExamData, useFetchTeacherExamDetailAPI, useUpdateTeacherExamAPI} from "hooks/apis";
import {TeacherExamDetail} from "types";
import {ErrorPage, LoadingPage, ResponseWrapper} from "components";
import {truncate} from "utils";
import dayjs from "dayjs";

import Content from "./Content";

const TeacherExamDetailPage = () => {
    const {t} = useTranslation();
    const {id} = useParams<{ id: string; }>();
    const queryOptions = useQueryOptions();
    const fetchExam = useFetchTeacherExamDetailAPI();
    const updateExam = useUpdateTeacherExamAPI();

    const [exam, setExam] = useState<TeacherExamDetail>();

    const {
        error,
        isLoading,
        data,
        isFetching,
        refetch,
        dataUpdatedAt,
    } = useQuery<TeacherExamDetail, AxiosError>(
        ["fetch_exam", id],
        () => fetchExam(id),
        {
            ...queryOptions,
            onSuccess: setExam,
        },
    );

    const {
        mutateAsync: update,
    } = useMutation<TeacherExamDetail, AxiosError, IUpdateTeacherExamData>(
        values => updateExam(id, values),
        {
            onSuccess: setExam,
        },
    );

    return (
        <ResponseWrapper<TeacherExamDetail>
            renderLoading={() => <LoadingPage title={t("Arbeit wird geladen...")} />}
            data={data}
            error={error}
            renderError={error =>
                <ErrorPage
                    status={error?.response?.status}
                    notFound={t("Diese Arbeit wurde nicht gefunden.")}
                />
            }
            isLoading={isLoading}
            getDocumentTitle={exam => t("{{title}} | {{subject}}-Arbeit", {
                title: truncate(exam.title, 20),
                subject: exam.course.subject.name,
            })}
        >
            {() => (exam ? (
                <Content
                    exam={exam}
                    isFetching={isFetching}
                    dataUpdatedAt={dayjs(dataUpdatedAt)}
                    update={update}
                    refetch={refetch}
                />
            ) : null)}
        </ResponseWrapper>
    );
};

export default TeacherExamDetailPage;
