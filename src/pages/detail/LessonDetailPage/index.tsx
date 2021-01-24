import React, {useCallback, useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDetailPageError, useQueryOptions} from "hooks";
import {IFetchLessonsResponse, useFetchLessonDetailAPI} from "hooks/apis";
import {Box, Button, ButtonGroup, Collapse, Grid, Link, Paper, Typography} from "@material-ui/core";
import dayjs from "dayjs";
import {DetailPage, Homework, LoadingPage, Material, ScoosoMaterial} from "components";
import {FaChalkboardTeacher, FaRunning, FaVideo, FiMonitor, MdPlace} from "react-icons/all";
import {useQuery} from "react-query";
import {LessonDetail} from "types";
import {ErrorContext} from "contexts";
import {buildPath, combineDatetime} from "utils";
import {AxiosError} from "axios";
import {Alert} from "@material-ui/lab";
import {CourseIcon, ExamIcon, HomeworkIcon, TeacherIcon} from "components/icons";

import Submissions from "./Submissions";
import ModificationsNode from "./ModificationsNode";
import useAbsence from "./useAbsence";
import AbsenceForm from "./AbsenceForm";


const gridItemStyle = {
    width: "100%",
};

type LessonKeys = "presenceContent" | "distanceContent" | "room" | "course" | "teacher";

const LessonDetailPage = ({match: {params: {id}}}) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchLesson = useFetchLessonDetailAPI();
    const {onFetchError} = useDetailPageError();
    const {dispatch: dispatchError} = useContext(ErrorContext);

    const [lesson, setLesson] = useState<LessonDetail>();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Lesson is set when method is called
    const updateLessonAbsence = useCallback(absence => setLesson(prevState => ({
        ...prevState,
        absence,
    })), []);

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
    const absence = useAbsence(updateLessonAbsence, lesson);

    // Rendering
    if (isLoading) {
        return <LoadingPage title={t("Stunde wird geladen...")} />;
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
    const {videoConferenceLink} = lesson;

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
            data={{
                presenceContent: {
                    icon: <FaChalkboardTeacher />,
                    title: t("Inhalt Präsenzunterricht"),
                    information: lesson.classbook?.presenceContent,
                },
                distanceContent: {
                    icon: <FiMonitor />,
                    title: t("Inhalt Fernunterricht"),
                    information: lesson.classbook?.distanceContent,
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
                            href={buildPath("/agenda/teacher/detail/:id/", {
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
            }}
            headerNode={lesson?.modifications.length > 0 && <ModificationsNode lesson={lesson} />}
            relationButtons={{
                values: {
                    attendance: {
                        title: t("Anwesend"),
                        isActive: !lesson.absence,
                        icon: <FaRunning />,
                    },
                },
                onSubmit: async ({attendance}, {resetForm, setSubmitting}) => {
                    try {
                        if (attendance) {
                            await absence.remove();
                        } else {
                            await absence.add();
                        }
                    } catch (error) {
                        resetForm();
                    } finally {
                        setSubmitting(false);
                    }
                },
            }}
            renderTopField={reorderElement => (
                <>
                    <Grid item>
                        {reorderElement}
                    </Grid>
                    <Grid item>
                        {videoConferenceLink &&
                        <Link
                            href={videoConferenceLink}
                            rel="noopener noreferrer"
                            component={Button}
                            underline="none"
                            target="_blank"
                            startIcon={<FaVideo />}
                        >
                            {t("Video-Konferenz öffnen")}
                        </Link>}
                    </Grid>
                </>
            )}
            bottomNode={[
                <Collapse
                    key={`write_illness_email_${lesson.id}`}
                    in={Boolean(lesson.absence)}
                >
                    <AbsenceForm
                        absence={lesson.absence}
                        onSubmit={(values, {setSubmitting}) =>
                            absence
                                .update(values)
                                .finally(() => setSubmitting(false))
                        }
                    />
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
                                        {material.size
                                            ? (
                                                <Material
                                                    key={material.id}
                                                    id={material.id}
                                                    name={material.name}
                                                    addedAt={material.addedAt}
                                                    size={material.size}
                                                    isDeleted={material.isDeleted}
                                                />
                                            )
                                            : (
                                                <ScoosoMaterial
                                                    key={material.id}
                                                    name={material.name}
                                                    id={material.id}
                                                />
                                            )
                                        }
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
                                            information={homework.truncatedInformation}
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
                                    place: lesson.lessonData.room.id,
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


export default LessonDetailPage;
