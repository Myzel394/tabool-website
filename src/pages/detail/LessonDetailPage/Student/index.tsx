import React from "react";
import {useFetchStudentLessonAPI} from "hooks/apis";
import {useParams} from "react-router";
import dayjs from "dayjs";
import {useQuery} from "react-query";
import {StudentLessonView} from "types";
import {AxiosError} from "axios";
import {buildPath, lazyDatetime} from "utils";
import {useQueryOptions} from "hooks";
import {CourseIcon, DetailPage, ErrorPage, LinkTitleGrabber, LoadingPage, ResponseWrapper} from "components";
import {useTranslation} from "react-i18next";
import {FaChalkboardTeacher, IoIosVideocam, MdDateRange, MdLaptop, MdWatch} from "react-icons/all";
import {Button, Link} from "@material-ui/core";

type LessonKeys = "presenceContent" | "onlineContent" | "videoConferenceLink" | "hours" | "weekday" | "course";

const LessonDetailPage = () => {
    const {t} = useTranslation();
    const {id: lessonId, date: dateStr} = useParams<{ id: string; date: string; }>();
    const date = dayjs(dateStr);
    const queryOptions = useQueryOptions();
    const fetchLesson = useFetchStudentLessonAPI();

    const {
        data,
        error,
        dataUpdatedAt,
        isLoading,
        refetch,
        isFetching,
    } = useQuery<StudentLessonView, AxiosError>(
        ["fetch_lesson", lessonId, lazyDatetime(date, "date")],
        () => fetchLesson({
            lessonId,
            lessonDate: date,
        }),
        queryOptions,
    );

    return (
        <ResponseWrapper<StudentLessonView>
            isLoading={isLoading}
            data={data}
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
                date: date.format("LL"),
            })}
        >
            {lesson =>
                <DetailPage<LessonKeys, "", StudentLessonView>
                    color={lesson.lessonInformation.course.subject.userRelation.color}
                    orderingStorageName="lesson"
                    defaultOrdering={
                        ["presenceContent", "onlineContent", "videoConferenceLink", "hours", "weekday", "course"]
                    }
                    updatedAt={dayjs(dataUpdatedAt)}
                    isRefreshing={isFetching}
                    data={{
                        presenceContent: {
                            information: lesson.classbook.presenceContent,
                            title: t("Inhalt Präsenzunterricht"),
                            icon: <FaChalkboardTeacher />,
                        },
                        onlineContent: {
                            information: lesson.classbook.onlineContent,
                            title: t("Inhalt Fernunterricht"),
                            icon: <MdLaptop />,
                        },
                        videoConferenceLink: {
                            information: lesson.classbook.videoConferenceLink && (
                                <Link
                                    underline="none"
                                    href={lesson.classbook.videoConferenceLink}
                                >
                                    <LinkTitleGrabber>
                                        {lesson.classbook.videoConferenceLink}
                                    </LinkTitleGrabber>
                                </Link>
                            ),
                            title: t("Video-Konferenz"),
                            icon: <IoIosVideocam />,
                        },
                        hours: {
                            information: (() => {
                                const {startHour, endHour} = lesson.lessonInformation;

                                if (startHour === endHour) {
                                    return startHour.toString();
                                }
                                return `${startHour} - ${endHour}`;
                            })(),
                            title: t("Zeit"),
                            icon: <MdWatch />,
                        },
                        weekday: {
                            information: date.format("dddd"),
                            title: t("Wochentag"),
                            icon: <MdDateRange />,
                        },
                        course: {
                            icon: <CourseIcon />,
                            title: t("Kurs"),
                            information: `${lesson.lessonInformation.course.name}`,
                            disableShowMore: true,
                            helperText: (
                                <Link
                                    underline="none"
                                    component={Button}
                                    href={buildPath("/agenda/course/detail/:id/", {
                                        id: lesson.lessonInformation.course.id,
                                    })}
                                >
                                    {t("Zum Kurs")}
                                </Link>
                            ),
                        },
                    }}
                    title={lesson.lessonInformation.course.name}
                    subTitle={(() => {
                        const {lessonInformation: {startHour, endHour}} = lesson;

                        if (startHour === endHour) {
                            return t("Am {{weekday}}, in der {{hour}}. Stunde", {
                                hour: startHour,
                                weekday: date.format("dddd"),
                            });
                        } else {
                            return t("Am {{weekday}}, {{startHour}} - {{endHour}}", {
                                startHour,
                                endHour,
                                weekday: date.format("dddd"),
                            });
                        }
                    })()}
                    onRefetch={refetch}
                />
            }
        </ResponseWrapper>
    );
};
export default LessonDetailPage;


