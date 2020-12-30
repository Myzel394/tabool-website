import React, {memo} from "react";


const gridItemStyle = {
    width: "100%",
};

type LessonKeys = "presenceContent" | "distanceContent" | "room" | "course" | "teacher";

const LessonDetailPage = ({match: {params: {id}}}) => {
    return null;

    /*
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
        mutate: mutateRelation,
        isLoading: isUpdatingRelation,
    } = useMutation<IUpdateLessonUserRelationResponse, AxiosError, IUpdateLessonUserRelationData>(
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
            subInformation: (
                <Link
                    component={Button}
                    underline="none"
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
            headerNode={lesson?.modifications.length > 0 && <ModificationsNode lesson={lesson} />}
            bottomNode={[
                <Collapse
                    key={`write_illness_email_${lesson.id}`}
                    in={!lesson.userRelation.attendance}
                >
                    <IllEmailButton />
                </Collapse>,
                <div key="materials">
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
                                    />
                                </Grid>)}
                        </Grid>
                    ) : (
                        <Alert severity="info">
                            {t("Keine Materialien verfügbar.")}
                        </Alert>
                    )}
                </div>,
                <div key="homeworks">,
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
                </div>,
                <div key="submissions">
                    <Typography variant="h2">
                        {t("Einsendungen")}
                    </Typography>
                    <Submissions lesson={lesson} />
                </div>,
                <Box key="actions" display="flex" justifyContent="center" alignItems="center">
                    <ButtonGroup variant="outlined">
                        <Link
                            underline="none"
                            component={Button}
                            startIcon={<HomeworkIcon />}
                            href={generatePath("/homework/add?:query", {
                                query: queryString.stringify({
                                    lesson: lesson.id,
                                }),
                            })}
                        >
                            {t("Hausaufgabe hinzufügen")}
                        </Link>
                    </ButtonGroup>
                </Box>,
            ]}
        />
    );*/
};


export default memo(LessonDetailPage);
