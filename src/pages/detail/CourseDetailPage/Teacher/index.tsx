import React from "react";
import {useParams} from "react-router";
import {useTranslation} from "react-i18next";
import {useQueryOptions} from "hooks";
import {useFetchTeacherCourseDetailAPI} from "hooks/apis";
import {useQuery} from "react-query";
import {TeacherCourseDetail} from "types";
import {AxiosError} from "axios";
import {DetailPage, ErrorPage, GenderStatus, LoadingPage, ResponseWrapper} from "components";
import {RoomIcon, SubjectIcon} from "mappings";
import {FaUsers, MdTitle} from "react-icons/all";
import {Button, Link, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import dayjs from "dayjs";
import {buildPath, findNextDate} from "utils";

type CourseKeys = "name" | "participants" | "subject" | "room";

const TeacherCourseDetailPage = () => {
    const {id} = useParams<{ id: string; }>();
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchCourse = useFetchTeacherCourseDetailAPI();

    const {
        error,
        isLoading,
        data,
        isFetching,
        refetch,
        dataUpdatedAt,
    } = useQuery<TeacherCourseDetail, AxiosError>(
        ["fetch_course", id],
        () => fetchCourse(id),
        queryOptions,
    );

    return (
        <ResponseWrapper<TeacherCourseDetail>
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
                <DetailPage<CourseKeys, "", TeacherCourseDetail>
                    color={course.subject.userRelation.color}
                    orderingStorageName="teacher-course"
                    defaultOrdering={[
                        "name", "subject", "room", "participants",
                    ]}
                    isRefreshing={isFetching}
                    data={{
                        name: {
                            icon: <MdTitle />,
                            title: t("Name"),
                            information: course.name,
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
                        participants: {
                            icon: <FaUsers />,
                            title: t("Teilnehmer"),
                            disableShowMore: true,
                            information: (
                                <List>
                                    {course.participants.map(participant =>
                                        <ListItem
                                            key={participant.id}
                                            button
                                            component="a"
                                            href={buildPath("/agenda/student/detail/:id/", {
                                                id: participant.id,
                                            })}
                                        >
                                            <ListItemIcon>
                                                <GenderStatus justIcon value={participant.gender} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`${participant.firstName} ${participant.lastName}`}
                                            />
                                        </ListItem>)}
                                </List>
                            ),
                        },
                    }}
                    title={course.name}
                    subTitle={(() => {
                        const now = dayjs();
                        const weekdays = course.weekdays.map(weekday => findNextDate(now, weekday).format("dddd"));

                        return t("Immer am {{weekdays}}", {
                            weekdays,
                        });
                    })()}
                    updatedAt={dayjs(dataUpdatedAt)}
                    onRefetch={refetch}
                />
            }
        </ResponseWrapper>
    );
};

export default TeacherCourseDetailPage;
