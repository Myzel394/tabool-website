import React, {memo, useContext, useState} from "react";
import {useDetailPageError, useFetchLessonDetailAPI, useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {LessonDetail} from "types";
import {AxiosError} from "axios";
import {DetailPage, LoadingIndicator} from "components";
import {ErrorContext} from "contexts";
import dayjs from "dayjs";
import {FaChalkboardTeacher, FiMonitor, MdPlace} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {CourseIcon, TeacherIcon} from "components/icons";
import _ from "lodash";
import {Button, Link} from "@material-ui/core";
import {generatePath} from "react-router";

type LessonKeys = "presenceContent" | "distanceContent" | "room" | "course" | "teacher";

const LessonDetailPage = ({match: {params: {id}}}) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchLesson = useFetchLessonDetailAPI();
    const {onFetchError} = useDetailPageError();
    const {dispatch: dispatchError} = useContext(ErrorContext);

    const [lesson, setLesson] = useState<LessonDetail>();

    const {
        isLoading,
        updatedAt,
        refetch,
        isFetching,
    } = useQuery<LessonDetail, AxiosError>(
        id,
        fetchLesson,
        {
            ...queryOptions,
            onSuccess: setLesson,
            onError: (error) => onFetchError(error, Boolean(lesson)),
        },
    );

    // Rendering
    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (!lesson) {
        dispatchError({
            type: "setError",
            payload: {},
        });
        return null;
    }

    const data: any = _.pickBy({
        presenceContent: {
            icon: <FaChalkboardTeacher />,
            title: t("Inhalt Präsenzunterricht"),
            information: lesson.classBook?.presenceContent,
        },
        distanceContent: {
            icon: <FiMonitor />,
            title: t("Inhalt Fernunterricht"),
            information: lesson.classBook?.distanceContent,
        },
        course: {
            icon: <CourseIcon />,
            title: t("Kurs"),
            information: lesson.lessonData.course.name,
            disableShowMore: true,
        },
        teacher: {
            icon: <TeacherIcon />,
            title: t("Lehrer"),
            information: `${lesson.lessonData.course.teacher.firstName} ${lesson.lessonData.course.teacher.lastName}`,
            disableShowMore: true,
            subInformation: (
                <Link
                    component={Button}
                    href={generatePath("/lesson/teacher/detail/:id/", {
                        id: lesson.lessonData.course.teacher.id,
                    })}
                >
                    {t("Zum Lehrer")}
                </Link>
            ),
        },
        room: {
            icon: <MdPlace />,
            title: t("Raum"),
            information: lesson.lessonData.room.place,
            disableShowMore: true,
        },
    }, _.negate(_.isUndefined));

    return (
        <DetailPage<LessonKeys>
            title={lesson.lessonData.course.name}
            color={lesson.lessonData.course.subject.userRelation.color}
            defaultOrdering={[
                "presenceContent", "distanceContent", "room", "teacher", "course",
            ]}
            orderingStorageName="detail:ordering:lesson"
            refetch={refetch}
            isRefreshing={isFetching}
            updatedAt={dayjs(updatedAt)}
            data={data}
        />
    );
};

export default memo(LessonDetailPage);
