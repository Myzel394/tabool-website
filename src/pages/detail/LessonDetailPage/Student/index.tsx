import React, {useState} from "react";
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
import {FaChalkboardTeacher, IoIosVideocam, MdLaptop, MdWatch} from "react-icons/all";
import {Button, Link} from "@material-ui/core";

import RelatedObjects from "./RelatedObjects";

type LessonKeys = "presenceContent" | "onlineContent" | "videoConferenceLink" | "time" | "course";

const StudentLessonDetailPage = () => {
    const {t} = useTranslation();
    const {id: lessonId, date: dateStr} = useParams<{ id: string; date: string; }>();
    const lessonDate = dayjs(dateStr);
    const queryOptions = useQueryOptions();
    const fetchLesson = useFetchStudentLessonAPI();

    const [lesson, setLesson] = useState<StudentLessonView>();

    const {
        data,
        error,
        dataUpdatedAt,
        isLoading,
        refetch,
        isFetching,
    } = useQuery<StudentLessonView, AxiosError>(
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
                date: lessonDate.format("LL"),
            })}
        >
            {() =>
                <>
                    {lesson && (
                        <DetailPage<LessonKeys, "", StudentLessonView>
                            color={lesson.lessonInformation.course.subject.userRelation.color}
                            orderingStorageName="lesson"
                            defaultOrdering={
                                ["presenceContent", "onlineContent", "videoConferenceLink", "time", "course"]
                            }
                            updatedAt={dayjs(dataUpdatedAt)}
                            isRefreshing={isFetching}
                            data={{
                                presenceContent: {
                                    information: lesson?.classbook?.presenceContent,
                                    title: t("Inhalt Präsenzunterricht"),
                                    icon: <FaChalkboardTeacher />,
                                },
                                onlineContent: {
                                    information: lesson?.classbook?.onlineContent,
                                    title: t("Inhalt Fernunterricht"),
                                    icon: <MdLaptop />,
                                },
                                videoConferenceLink: {
                                    information: lesson?.classbook?.videoConferenceLink && (
                                        <Link
                                            underline="none"
                                            target="_blank"
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
                                time: {
                                    information: (() => {
                                        const weekday = lessonDate.format("dddd");
                                        const {startHour, endHour} = lesson.lessonInformation;
                                        const hourString = startHour === endHour
                                            ? t("{{hour}}. Stunde", {
                                                hour: startHour.toString(),
                                            }) : t("{{startHour}}. - {{endHour}}. Stunde", {
                                                startHour,
                                                endHour,
                                            });

                                        return t("{{weekday}}, {{hour}}", {
                                            weekday,
                                            hour: hourString,
                                        });
                                    })(),
                                    title: t("Zeit"),
                                    icon: <MdWatch />,
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
                            bottomNode={
                                <RelatedObjects
                                    materials={lesson.materials}
                                    homeworks={lesson.homeworks}
                                    submissions={lesson.submissions}
                                    lessonDate={lessonDate}
                                    lesson={lesson.lessonInformation}
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    onLessonUpdate={setLesson}
                                />
                            }
                            title={lesson.lessonInformation.course.name}
                            subTitle={(() => {
                                const {lessonInformation: {startHour, endHour}} = lesson;

                                if (startHour === endHour) {
                                    return t("Am {{weekday}}, in der {{hour}}. Stunde", {
                                        hour: startHour,
                                        weekday: lessonDate.format("dddd"),
                                    });
                                } else {
                                    return t("Am {{weekday}}, {{startHour}} - {{endHour}}", {
                                        startHour,
                                        endHour,
                                        weekday: lessonDate.format("dddd"),
                                    });
                                }
                            })()}
                            onRefetch={refetch}
                        />
                    )}
                </>
            }
        </ResponseWrapper>
    );
};
export default StudentLessonDetailPage;


