import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Exam, Material, ShowMoreArray, ShowMoreButton, SingleLesson, SingleModification} from "components";
import {StudentExamDetail, StudentWeekView} from "types";
import {Box, Button, Grid, Link, List, ListItem, ListItemText, Typography, useTheme} from "@material-ui/core";
import {useElementSize, useSnackbar, useUniqueId} from "hooks";
import {Fade, Slide, Zoom} from "react-reveal";
import {buildPath, copyText, lazyDatetime, truncate} from "utils";
import {MdShare} from "react-icons/all";
import {Dayjs} from "dayjs";


export interface BottomContentProps {
    timetable: StudentWeekView;
    selectedDate: Dayjs;
}

const BottomContent = ({
    timetable,
    selectedDate,
}: BottomContentProps) => {
    const {t} = useTranslation();
    const {
        addSuccess,
        addWarning,
    } = useSnackbar();
    const theme = useTheme();

    const [examWrapperRef, setExamWrapperRef] = useState<any>();
    const [wrapperWidth = 0] = useElementSize(examWrapperRef);
    const width = Math.max(200, wrapperWidth * 0.9);

    const materialsId = useUniqueId();
    const modificationsId = useUniqueId();
    const eventsId = useUniqueId();

    const shareDate = async (): Promise<void> => {
        const {origin, pathname} = window.location;
        const hash = `${lazyDatetime(selectedDate, "date")}`;
        const url = `${origin}${pathname}#${hash}`;
        const adMessage = t("Schau dir den {{date}} an!", {
            date: selectedDate.format("LL"),
        });

        if (navigator.share) {
            await navigator.share({
                url,
                title: t("{{weekday}}, der {{date}}", {
                    weekday: selectedDate.format("dddd"),
                    date: selectedDate.format("l"),
                }),
                text: adMessage,
            });
            return;
        }

        try {
            await copyText(`${adMessage}\n\n${url}`);
            addSuccess(t("Dein Browser unterstützt Teilen nicht, der Text wurde dir dafür in die Zwischenablage kopiert!"));
        } catch (err) {
            addWarning(t("Dein Browser unterstützt Teilen nicht und der Text konnte auch nicht kopiert werden. Du kannst die URL manuell kopieren und teilen."));

            if (window.location.hash) {
                window.location.hash = hash;
            }
        }
    };

    return (
        <Box my={3}>
            <Grid container spacing={1} direction="column">
                {timetable.lessons.map(lesson =>
                    <Grid key={lesson.id} item>
                        <Zoom duration={theme.transitions.duration.enteringScreen}>
                            <SingleLesson
                                showDetails
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore: BottomContent (this component) is only rendered, when a selectedDate is chosen
                                date={selectedDate}
                                lesson={lesson}
                                homeworkCount={timetable.homeworks.filter(homework => homework.lesson.id === lesson.id).length}
                                materialCount={timetable.materials.filter(material => material.lesson.id === lesson.id).length}
                            />
                        </Zoom>
                    </Grid>)}
            </Grid>
            {timetable.modifications.length ? (
                <Box mt={3}>
                    <Typography variant="h5" id={modificationsId}>
                        {t("Veränderungen")}
                    </Typography>
                    <List aria-labelledby={modificationsId}>
                        {timetable.modifications.map(modification =>
                            <ListItem key={modification.id}>
                                <SingleModification
                                    lesson={modification.lesson}
                                    modificationType={modification.modificationType}
                                    newSubject={modification.newSubject}
                                />
                            </ListItem>)}
                    </List>
                </Box>
            ) : null}
            {timetable.materials.length ? (
                <Box mt={3}>
                    <Typography variant="h5" id={materialsId}>
                        {t("Materialien")}
                    </Typography>
                    <List aria-labelledby={materialsId}>
                        {timetable.materials.map(material =>
                            <ListItem key={material.id}>
                                <Slide left duration={theme.transitions.duration.enteringScreen}>
                                    <Material {...material} />
                                </Slide>
                            </ListItem>)}
                    </List>
                </Box>
            ) : null}
            {timetable.exams.length ? (
                <Box mt={3}>
                    <Typography variant="h5">
                        {t("Arbeiten")}
                    </Typography>
                    <div
                        ref={reference => {
                            if (reference) {
                                setExamWrapperRef(reference);
                            }
                        }}
                    >
                        <ShowMoreArray<StudentExamDetail>
                            maxElements={2}
                            elements={timetable.exams}
                            renderButton={(isShown, update) =>
                                <ShowMoreButton showMore={isShown} onClick={update} />
                            }
                        >
                            {exam =>
                                <Zoom key={exam.id} duration={theme.transitions.duration.enteringScreen}>
                                    <Link
                                        underline="none"
                                        href={buildPath("/agenda/exam/detail/:id", {
                                            id: exam.id,
                                        })}
                                        style={{
                                            width: width || "100%",
                                        }}
                                    >
                                        <Exam
                                            information={truncate(exam.information)}
                                            course={exam.course}
                                            targetedDate={exam.date}
                                        />
                                    </Link>
                                </Zoom>
                            }
                        </ShowMoreArray>
                    </div>
                </Box>
            ) : null}
            {timetable.events.length ? (
                <Box mt={3}>
                    <Typography variant="h5" id={eventsId}>
                        {t("Events")}
                    </Typography>
                    <List aria-labelledby={eventsId}>
                        {timetable.events.map(event =>
                            <ListItem key={event.id}>
                                <Fade duration={theme.transitions.duration.enteringScreen}>
                                    <ListItemText
                                        primary={event.title}
                                        secondary={[
                                            event.room?.place,
                                            truncate(event.information),
                                        ].filter(Boolean)
                                            .join(" | ")}
                                    />
                                </Fade>
                            </ListItem>)}
                    </List>
                </Box>
            ) : null}
            <Box my={3} display="flex" alignItems="center" justifyContent="center">
                <Button
                    startIcon={<MdShare />}
                    onClick={shareDate}
                >
                    {t("Teilen")}
                </Button>
            </Box>
        </Box>
    );
};

export default BottomContent;
