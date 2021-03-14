import React from "react";
import {useParams} from "react-router";
import {useFetchStudentExamDetailAPI} from "hooks/apis";
import {useQuery} from "react-query";
import {StudentExamDetail} from "types";
import {AxiosError} from "axios";
import {useQueryOptions} from "hooks";
import {CourseIcon, DetailPage, ErrorPage, LoadingPage, ResponseWrapper} from "components";
import {useTranslation} from "react-i18next";
import {MdInfo, MdTitle, MdToday} from "react-icons/all";
import dayjs, {Dayjs} from "dayjs";
import {Button, Link} from "@material-ui/core";
import {buildPath, truncate} from "utils";

type ExamKeys = "title" | "information" | "date" | "course";

const ExamDetailPage = () => {
    const {t} = useTranslation();
    const {id} = useParams<{ id: string; }>();
    const queryOptions = useQueryOptions();
    const fetchExam = useFetchStudentExamDetailAPI();

    const {
        error,
        isLoading,
        data,
        isFetching,
        refetch,
        dataUpdatedAt,
    } = useQuery<StudentExamDetail, AxiosError>(
        ["fetch_exam", id],
        () => fetchExam(id),
        queryOptions,
    );

    return (
        <ResponseWrapper<StudentExamDetail>
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
            {exam =>
                <DetailPage<ExamKeys, "", StudentExamDetail>
                    color={exam.course.subject.userRelation.color}
                    orderingStorageName="exam"
                    defaultOrdering={["title", "information", "date", "course"]}
                    isRefreshing={isFetching}
                    data={{
                        title: {
                            title: t("Titel"),
                            information: exam.title,
                            disableShowMore: true,
                            icon: <MdTitle />,
                        },
                        information: {
                            title: t("Informationen"),
                            information: exam.information,
                            icon: <MdInfo />,
                        },
                        date: {
                            title: t("Datum"),
                            helperText: t("Der Tag, an dem die Arbeit geschrieben wird"),
                            information: exam.date.format("LL"),
                            nativeValue: exam.date,
                            isEqual: (oldValue: Dayjs, newValue: Dayjs) => oldValue?.isSame?.(newValue),
                            disableShowMore: true,
                            icon: <MdToday />,
                        },
                        course: {
                            icon: <CourseIcon />,
                            title: t("Kurs"),
                            information: exam.course.name,
                            disableShowMore: true,
                            helperText: (
                                <Link
                                    underline="none"
                                    component={Button}
                                    href={buildPath("/agenda/course/detail/:id/", {
                                        id: exam.course.id,
                                    })}
                                >
                                    {t("Zum Kurs")}
                                </Link>
                            ),
                        },
                    }}
                    updatedAt={dayjs(dataUpdatedAt)}
                    title={exam.title}
                    subTitle={t("eine {{subject}}-Arbeit am {{date}}", {
                        subject: exam.course.subject.name,
                        date: exam.date.format("LL"),
                    })}
                    onRefetch={refetch}
                />
            }
        </ResponseWrapper>
    );
};
export default ExamDetailPage;


