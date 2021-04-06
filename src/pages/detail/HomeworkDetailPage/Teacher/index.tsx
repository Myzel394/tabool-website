import React from "react";
import {useParams} from "react-router";
import {useTranslation} from "react-i18next/src";
import {ErrorPage, LoadingPage, ResponseWrapper} from "components";
import {TeacherHomeworkDetail} from "types";

import useServer from "./useServer";
import Content from "./Content";


const TeacherHomeworkDetailPage = () => {
    const {t} = useTranslation();
    const {id} = useParams<{ id: string; }>();
    const {
        isLoading,
        error,
        homework,
        updateHomework,
        ...contentProps
    } = useServer(id);

    return (
        <ResponseWrapper<TeacherHomeworkDetail>
            isLoading={isLoading}
            renderLoading={() => <LoadingPage title={t("Hausaufgabe wird geladen...")} />}
            renderError={error =>
                <ErrorPage
                    status={error?.response?.status}
                    notFound={t("Diese Hausaufgabe wurde nicht gefunden.")}
                />
            }
            data={homework}
            error={error}
            getDocumentTitle={homework => t("Hausaufgabe in {{course}} bis zum {{dueDate}}", {
                course: homework.lesson.course.name,
                dueDate: homework.dueDate?.format("LL"),
            })}
        >
            {() => (homework ? (
                <Content
                    {...contentProps}
                    homework={homework}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore: homework is just checked
                    updateHomework={updateHomework}
                />
            ) : null)}
        </ResponseWrapper>
    );
};
export default TeacherHomeworkDetailPage;

