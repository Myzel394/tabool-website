import React, {memo, useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDetailPageError, useQueryOptions, useSnackbar} from "hooks";
import {
    IFetchLessonsResponse,
    IUpdateLessonUserRelationData,
    IUpdateLessonUserRelationResponse,
    useFetchLessonDetailAPI,
    useUpdateLessonUserRelationAPI,
} from "hooks/apis";
import {Box, Button, ButtonGroup, Collapse, Grid, Link, Paper, Typography} from "@material-ui/core";
import update from "immutability-helper";
import dayjs from "dayjs";
import {DetailPage, Homework, IllEmailButton, LoadingIndicator} from "components";
import {FaChalkboardTeacher, FaRunning, FiMonitor, MdPlace} from "react-icons/all";
import {generatePath} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import {LessonDetail} from "types";
import {ErrorContext} from "contexts";
import Material from "components/Material";
import {buildPath, combineDatetime} from "utils";
import {AxiosError} from "axios";
import {Alert} from "@material-ui/lab";
import {CourseIcon, ExamIcon, HomeworkIcon, TeacherIcon} from "components/icons";
import _ from "lodash";
import {PredefinedMessageType} from "hooks/useSnackbar";

import ModificationsNode from "./ModificationsNode";
import Submissions from "./Submissions";


const gridItemStyle = {
    width: "100%",
};

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

    // Lesson
    const {
        isLoading,
        dataUpdatedAt,
        refetch,
        isFetching,
    } = useQuery<LessonDetail, AxiosError>(
        `fetch_lesson_${id}`,
        () => fetchLesson(id),
        {
            ...queryOptions,
            onSuccess: setLesson,
            onError: (error) => onFetchError(error, Boolean(lesson)),
        },
    );
    // Relation
    const {
        mutateAsync: mutateRelation,
    } = useMutation<IUpdateLessonUserRelationResponse, AxiosError, IUpdateLessonUserRelationData>(
        newRelation => updateLessonUserRelation(id, newRelation),
        {
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

    // Subtitle
    const lessonDateFormat = lesson.date.format("ll");
    const startTimeFormat = combineDatetime(lesson.date, lesson.lessonData.startTime).format("LT");
    const endTimeFormat = combineDatetime(lesson.date, lesson.lessonData.endTime).format("LT");
    const subTitle = `${lessonDateFormat}, ${startTimeFormat} - ${endTimeFormat}`;

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
            helperText: (
                <Link
                    component={Button}
                    underline="none"
                    href={generatePath("/agenda/teacher/detail/:id/", {
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
        <DetailPage<LessonKeys, "attendance", IFetchLessonsResponse>
            title={lesson.lessonData.course.name}
            subTitle={subTitle}
            color={lesson.lessonData.course.subject.userRelation.color}
            defaultOrdering={[
                "presenceContent", "distanceContent", "room", "teacher", "course",
            ]}
            orderingStorageName="detail:ordering:lesson"
            refetch={refetch}
            isRefreshing={isFetching}
            updatedAt={dayjs(dataUpdatedAt)}
            data={data}
            relationButtons={{
                values: {
                    attendance: {
                        title: t("Anwesend"),
                        isActive: lesson.userRelation.attendance,
                        icon: <FaRunning />,
                    },
                },
                onSubmit: (newRelation, {resetForm, setSubmitting}) =>
                    mutateRelation(newRelation)
                        .then(relation => setLesson(prevState => update(prevState, {
                            userRelation: {
                                $set: relation,
                            },
                        })))
                        .catch(resetForm)
                        .finally(() => setSubmitting(true))
                ,
            }}
            headerNode={lesson?.modifications.length > 0 && <ModificationsNode lesson={lesson} />}
            bottomNode={[
                <Collapse
                    key={`write_illness_email_${lesson.id}`}
                    in={!lesson.userRelation.attendance}
                >
                    <IllEmailButton />
                </Collapse>,
                <Paper key="materials" elevation={0}>
                    <Box p={3}>
                        <Typography variant="h2">
                            {t("Materialien")}
                        </Typography>
                        {lesson.materials.length > 0 ? (
                            <Grid container spacing={1}>
                                {lesson.materials.map(material =>
                                    <Grid key={material.id} item style={gridItemStyle}>
                                        <Material
                                            key={material.id}
                                            id={material.id}
                                            name={material.name}
                                            addedAt={material.addedAt}
                                            size={material.size}
                                            isDeleted={material.isDeleted}
                                        />
                                    </Grid>)}
                            </Grid>
                        ) : (
                            <Alert severity="info">
                                {t("Keine Materialien verfügbar.")}
                            </Alert>
                        )}
                    </Box>
                </Paper>,
                <Paper key="homeworks" elevation={0}>
                    <Box p={3}>
                        <Typography variant="h2">
                            {t("Hausaufgaben")}
                        </Typography>
                        {lesson.homeworks.length > 0 ? (
                            <Grid container spacing={1}>
                                {lesson.homeworks.map(homework =>
                                    <Grid key={homework.id} item style={gridItemStyle}>
                                        <Homework
                                            subject={lesson.lessonData.course.subject}
                                            information={homework.information}
                                            id={homework.id}
                                            creationDate={homework.createdAt}
                                        />
                                    </Grid>)}
                            </Grid>
                        ) : (
                            <Alert severity="info">
                                {t("Keine Hausaufgaben, yay!")}
                            </Alert>
                        )}
                    </Box>
                </Paper>,
                <Paper key="submissions" elevation={0}>
                    <Box p={3}>
                        <Typography variant="h2">
                            {t("Einsendungen")}
                        </Typography>
                        <Submissions lesson={lesson} />
                    </Box>
                </Paper>,
                <div key="actions">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <ButtonGroup variant="outlined" orientation="vertical">
                            <Link
                                underline="none"
                                component={Button}
                                startIcon={<HomeworkIcon />}
                                href={buildPath("/add/homework/", undefined, {
                                    lesson: lesson.id,
                                })}
                            >
                                {t("Hausaufgabe hinzufügen")}
                            </Link>
                            <Link
                                underline="none"
                                component={Button}
                                startIcon={<ExamIcon />}
                                href={buildPath("/add/exam/", undefined, {
                                    course: lesson.lessonData.course.id,
                                    room: lesson.lessonData.room.id,
                                })}
                            >
                                {t("Klassenarbeit hinzufügen")}
                            </Link>
                        </ButtonGroup>
                    </Box>
                </div>,
            ]}
        />
    );
};


export default memo(LessonDetailPage);
