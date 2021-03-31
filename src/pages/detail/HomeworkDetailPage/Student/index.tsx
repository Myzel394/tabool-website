import React, {useState} from "react";
import {ErrorPage, LoadingPage, ResponseWrapper} from "components";
import {useTranslation} from "react-i18next";
import {StudentHomeworkDetail} from "types";
import {useParams} from "react-router";

import useServer from "./useServer";
import Content from "./Content";


const StudentHomeworkDetailPage = () => {
    const {id} = useParams<{ id: string; }>();
    const {t} = useTranslation();
    const {
        isLoading,
        error,
        ...contentProps
    } = useServer(id);

    const [homework, setHomework] = useState<StudentHomeworkDetail>();

    return (
        <ResponseWrapper<StudentHomeworkDetail>
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
                dueDate: homework.dueDate.format("LL"),
            })}
        >
            {() => (homework ? (
                <Content
                    {...contentProps}
                    homework={homework}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore: homework is just checked
                    updateHomework={setHomework}
                />
            ) : null)}
        </ResponseWrapper>
    );
};

export default StudentHomeworkDetailPage;
