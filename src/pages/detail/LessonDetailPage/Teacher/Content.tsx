import React, {Dispatch, SetStateAction} from "react";
import {TeacherLessonView} from "types";
import {Dayjs} from "dayjs";
import {CourseIcon, DetailPage, LinkTitleGrabber} from "components";
import {useTranslation} from "react-i18next";
import {FaChalkboardTeacher, IoIosVideocam, MdLaptop, MdWatch} from "react-icons/all";
import {Button, Link} from "@material-ui/core";
import {buildPath} from "utils";
import {Field} from "formik";
import {TextField} from "formik-material-ui";
import update from "immutability-helper";

import RelatedObjects from "./RelatedObjects";
import useValidationSchema from "./useValidationSchema";
import useClassbook from "./useClassbook";

export interface ContentProps {
    lesson: TeacherLessonView;
    updateLesson: Dispatch<SetStateAction<TeacherLessonView>>;
    lessonDate: Dayjs;
    updatedAt: Dayjs;
    isFetching: boolean;
    refetch: () => any;
}

type LessonKeys = "presenceContent" | "onlineContent" | "videoConferenceLink" | "time" | "course";

const Content = ({
    lesson,
    updateLesson,
    refetch,
    isFetching,
    updatedAt,
    lessonDate,
}: ContentProps) => {
    const {t} = useTranslation();
    const validationSchema = useValidationSchema();
    const {
        update: updateClassbook,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    } = useClassbook(lesson, lessonDate);

    return (
        <DetailPage<LessonKeys, "", TeacherLessonView>
            validationSchema={validationSchema}
            defaultOrdering={[
                "presenceContent", "onlineContent", "videoConferenceLink", "time", "course",
            ]}
            data={{
                presenceContent: {
                    information: lesson?.classbook?.presenceContent,
                    title: t("Inhalt Präsenzunterricht"),
                    icon: <FaChalkboardTeacher />,
                    renderField({getFieldProps}) {
                        return (
                            <Field
                                {...getFieldProps("presenceContent")}
                                fullWidth
                                multiline
                                variant="outlined"
                                component={TextField}
                            />
                        );
                    },
                },
                onlineContent: {
                    information: lesson?.classbook?.onlineContent,
                    title: t("Inhalt Fernunterricht"),
                    icon: <MdLaptop />,
                    renderField({getFieldProps}) {
                        return (
                            <Field
                                {...getFieldProps("onlineContent")}
                                fullWidth
                                multiline
                                variant="outlined"
                                component={TextField}
                            />
                        );
                    },
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
                    nativeValue: lesson?.classbook?.videoConferenceLink ?? "",
                    title: t("Video-Konferenz"),
                    icon: <IoIosVideocam />,
                    renderField({getFieldProps}) {
                        return (
                            <Field
                                {...getFieldProps("videoConferenceLink")}
                                fullWidth
                                name="videoConferenceLink"
                                variant="outlined"
                                component={TextField}
                            />
                        );
                    },
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
            color={lesson.lessonInformation.course.subject.userRelation.color}
            orderingStorageName="teacher-lesson"
            isRefreshing={isFetching}
            updatedAt={updatedAt}
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
            bottomNode={
                <RelatedObjects
                    updateLesson={updateLesson}
                    lesson={lesson.lessonInformation}
                    date={lessonDate}
                    homeworks={lesson.homeworks}
                    modifications={lesson.modifications}
                    submissions={lesson.submissions}
                    materials={lesson.materials}
                />
            }
            onSubmit={(values, {setSubmitting}) =>
                updateClassbook(values)
                    .then(newClassbook => updateLesson(lesson => update(lesson, {
                        classbook: {
                            $set: newClassbook,
                        },
                    })))
                    .finally(() => setSubmitting(false))
            }
            onRefetch={refetch}
        />
    );
};

export default Content;
