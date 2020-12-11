import React, {memo, useContext, useState} from "react";
import {
    useDetailPageError,
    useFetchLessonDetailAPI,
    useQueryOptions,
    useSnackbar,
    useUpdateLessonUserRelationAPI,
} from "hooks";
import {useMutation, useQuery} from "react-query";
import {LessonDetail} from "types";
import {AxiosError} from "axios";
import {DetailPage, LoadingIndicator} from "components";
import {ErrorContext} from "contexts";
import dayjs from "dayjs";
import {FaChalkboardTeacher, FaRunning, FiMonitor, MdPlace} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {CourseIcon, TeacherIcon} from "components/icons";
import _ from "lodash";
import {Button, Collapse, Link} from "@material-ui/core";
import {generatePath} from "react-router";
import update from "immutability-helper";
import {
    IUpdateLessonUserRelationData,
    IUpdateLessonUserRelationResponse,
} from "hooks/apis/send/userRelation/useUpdateLessonUserRelationAPI";
import {PredefinedMessageType} from "hooks/useSnackbar";
import IllEmailButton from "components/buttons/IllEmailButton";

type LessonKeys = "presenceContent" | "distanceContent" | "room" | "course" | "teacher";

const LessonDetailPage = ({match: {params: {id}}}) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchLesson = useFetchLessonDetailAPI();
    const updateLessonUserRelation = useUpdateLessonUserRelationAPI();
    const {onFetchError} = useDetailPageError();
    const {dispatch: dispatchError} = useContext(ErrorContext);
    const {addError} = useSnackbar();

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
    const [
        mutateRelation,
        {
            isLoading: isUpdatingRelation,
        },
    ] = useMutation<IUpdateLessonUserRelationResponse, AxiosError, IUpdateLessonUserRelationData>(
        updateLessonUserRelation, {
            onSuccess: newRelation => setLesson(prevState => update(prevState, {
                userRelation: {
                    $set: newRelation,
                },
            })),
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
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
                    href={generatePath("/teacher/detail/:id/", {
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
        <DetailPage<LessonKeys, any, "attendance">
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
            relation={{
                buttons: [
                    {
                        title: t("Anwesend"),
                        value: "attendance",
                        icon: <FaRunning />,
                    },
                ],
                isUpdating: isUpdatingRelation,
                value: lesson.userRelation,
                onChange: (newRelation) => mutateRelation({
                    id: lesson.id,
                    attendance: newRelation.attendance,
                }),
            }}
            bottomNode={
                <Collapse in={!lesson.userRelation.attendance}>
                    <IllEmailButton />
                </Collapse>
            }
        />
    );
};

export default memo(LessonDetailPage);
