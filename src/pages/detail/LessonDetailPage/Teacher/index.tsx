import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router";
import dayjs from "dayjs";
import {useQueryOptions} from "hooks";
import {useFetchTeacherLessonAPI} from "hooks/apis";
import {TeacherLessonView} from "types";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {lazyDatetime} from "utils";
import {ErrorPage, LoadingPage, ResponseWrapper} from "components";

import Content from "./Content";

const TeacherDetailPage = () => {
    const {t} = useTranslation();
    const {id: lessonId, date: dateStr} = useParams<{ id: string; date: string; }>();
    const lessonDate = dayjs(dateStr);
    const queryOptions = useQueryOptions();
    const fetchLesson = useFetchTeacherLessonAPI();

    const [lesson, setLesson] = useState<TeacherLessonView>();

    const {
        error,
        dataUpdatedAt,
        isLoading,
        refetch,
        isFetching,
    } = useQuery<TeacherLessonView, AxiosError>(
        ["fetch_lesson", lessonId, lazyDatetime(lessonDate, "date")],
        () => fetchLesson({
            lessonId,
            lessonDate,
        }),
        {
            ...queryOptions,
            onSuccess: setLesson,
        },
    );

    return (
        <ResponseWrapper<TeacherLessonView>
            isLoading={isLoading}
            data={lesson}
            error={error}
            renderLoading={() => <LoadingPage title={t("Stunde wird geladen...")} />}
            renderError={error =>
                <ErrorPage
                    status={error.response?.status}
                    notFound={t("Diese Stunde wurde nicht gefunden.")}
                />
            }
            getDocumentTitle={lesson => t("{{subject}}-Stunde am {{date}}", {
                subject: lesson.lessonInformation.course.subject.name,
                date: lessonDate.format("LL"),
            })}
        >
            {lesson =>
                <Content
                    lessonDate={lessonDate}
                    lesson={lesson}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    updateLesson={setLesson}
                    isFetching={isFetching}
                    refetch={refetch}
                    updatedAt={dayjs(dataUpdatedAt)}
                />
            }
        </ResponseWrapper>
    );
};

export default TeacherDetailPage;
