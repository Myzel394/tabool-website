import React from "react";
import {useTranslation} from "react-i18next";
import {useFetchStudentCourseDetailAPI} from "hooks/apis";
import {useQuery} from "react-query";
import {useParams} from "react-router";
import {StudentCourseDetail} from "types";
import {AxiosError} from "axios";
import {useQueryOptions} from "hooks";
import {DetailPage, ErrorPage, LoadingPage, ResponseWrapper, RoomIcon, SubjectIcon, TeacherIcon} from "components";
import {MdGroup, MdTitle} from "react-icons/all";
import {Button, Link} from "@material-ui/core";
import {buildPath} from "utils";
import dayjs from "dayjs";

type CourseKeys = "name" | "participantsCount" | "teacher" | "subject" | "room";

const CourseDetailPage = () => {
    const {id} = useParams<{ id: string; }>();
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchCourse = useFetchStudentCourseDetailAPI();

    const {
        error,
        isLoading,
        data,
        isFetching,
        refetch,
        dataUpdatedAt,
    } = useQuery<StudentCourseDetail, AxiosError>(
        ["fetch_course", id],
        () => fetchCourse(id),
        queryOptions,
    );

    return (
        <ResponseWrapper<StudentCourseDetail>
            renderLoading={() => <LoadingPage title={t("Kurs wird geladen...")} />}
            renderError={error =>
                <ErrorPage
                    status={error?.response?.status}
                    notFound={t("Dieser Kurs wurde nicht gefunden.")}
                />
            }
            isLoading={isLoading}
            data={data}
            error={error}
            getDocumentTitle={course => course.name}
        >
            {course =>
                <DetailPage<CourseKeys, "", StudentCourseDetail>
                    color={course.subject.userRelation.color}
                    orderingStorageName="course"
                    defaultOrdering={[
                        "name", "participantsCount", "teacher", "subject", "room",
                    ]}
                    isRefreshing={isFetching}
                    data={{
                        name: {
                            icon: <MdTitle />,
                            title: t("Name"),
                            information: course.name,
                            disableShowMore: true,
                        },
                        participantsCount: {
                            icon: <MdGroup />,
                            title: t("Teilnehmer"),
                            information: t("{{count}} Teilnehmer", {
                                count: course.participantsCount,
                            }),
                            nativeValue: course.participantsCount,
                            disableShowMore: true,
                        },
                        room: {
                            icon: <RoomIcon />,
                            title: t("Raum"),
                            disableShowMore: true,
                            information: course.room.place,
                        },
                        subject: {
                            icon: <SubjectIcon />,
                            title: t("Fach"),
                            disableShowMore: true,
                            information: course.subject.name,
                            helperText: (
                                <Link
                                    underline="none"
                                    component={Button}
                                    href={buildPath("/agenda/subject/detail/:id/", {
                                        id: course.subject.id,
                                    })}
                                >
                                    {t("Zum Fach")}
                                </Link>
                            ),
                        },
                        teacher: {
                            icon: <TeacherIcon />,
                            title: t("Lehrer"),
                            disableShowMore: true,
                            information: `${course.teacher.firstName} ${course.teacher.lastName}`,
                            helperText: (
                                <Link
                                    underline="none"
                                    component={Button}
                                    href={buildPath("/agenda/teacher/detail/:id/", {
                                        id: course.teacher.id,
                                    })}
                                >
                                    {t("Zum Lehrer")}
                                </Link>
                            ),
                        },
                    }}
                    title={course.name}
                    updatedAt={dayjs(dataUpdatedAt)}
                    onRefetch={refetch}
                />
            }
        </ResponseWrapper>
    );
};

export default CourseDetailPage;
