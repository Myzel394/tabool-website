import React, {useState} from "react";
import {Absence as AbsenceType, ErrorFieldsInjection, LessonRelatedDetail} from "types";
import {
    Avatar,
    Box,
    Collapse,
    IconButton,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    useTheme,
} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {FaPenNib} from "react-icons/all";
import {Field, Form, Formik} from "formik";
import {AbsenceReasonField, LoadingOverlay} from "components";
import {IUpdateAbsenceData, useUpdateAbsenceAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useAdaptedColor} from "hooks";
import {buildPath} from "utils";

export interface IAbsence {
    id: string;
    lesson: LessonRelatedDetail;
    reason: string;
    isSigned: boolean;
    onUpdate: (newAbsence: AbsenceType) => any;
}

const Absence = ({
    id,
    lesson,
    onUpdate,
    isSigned: parentIsSigned,
    reason: parentReason,
}: IAbsence) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const updateAbsence = useUpdateAbsenceAPI();
    const subjectColor = lesson.lessonData.course.subject.userRelation.color;
    const [textColor, backgroundColor] = useAdaptedColor(subjectColor, theme.palette.background.paper);

    const [editMode, setEditMode] = useState<boolean>(false);

    const {
        mutateAsync,
    } = useMutation<AbsenceType, AxiosError, IUpdateAbsenceData>(
        values => updateAbsence(id, values),
        {
            onSuccess: onUpdate,
        },
    );

    const subject = lesson.lessonData.course.subject.name;
    const subjectText = t("{{subject}}: {{startTime}} - {{endTime}}", {
        subject,
        startTime: lesson.lessonData.startTime.format("LT"),
        endTime: lesson.lessonData.endTime.format("LT"),
    });

    return (
        <Formik<IUpdateAbsenceData & ErrorFieldsInjection>
            enableReinitialize
            initialValues={{
                reason: parentReason,
                isSigned: parentIsSigned,
            }}
            onSubmit={(values, {setSubmitting, setErrors}) =>
                mutateAsync(values)
                    .catch(error => setErrors(error.response?.data))
                    .finally(() => setSubmitting(false))
            }
        >
            {({isSubmitting, submitForm, values, setFieldValue}) =>
                <>
                    <ListItem button onClick={() => setEditMode(prevState => !prevState)}>
                        <ListItemAvatar>
                            <Link
                                href={buildPath("/agenda/lesson/detail/:id", {
                                    id: lesson.id,
                                })}
                                underline="none"
                            >
                                <Avatar
                                    style={{
                                        backgroundColor,
                                        color: textColor,
                                    }}
                                >
                                    {lesson.lessonData.course.subject.shortName.substring(0, 3)}
                                </Avatar>
                            </Link>
                        </ListItemAvatar>
                        <ListItemText
                            primary={subjectText}
                            secondary={values.reason}
                        />
                        <ListItemSecondaryAction>
                            <Field
                                name="isSigned"
                                component={IconButton}
                                edge="end"
                                size="small"
                                onClick={() => {
                                    // Update
                                    setFieldValue("isSigned", !values.isSigned);
                                    submitForm();
                                }}
                            >
                                <FaPenNib
                                    style={{
                                        opacity: values.isSigned ? 1 : 0.2,
                                    }}
                                />
                            </Field>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Collapse in={editMode}>
                        <Box py={1} px={3}>
                            <LoadingOverlay isLoading={isSubmitting}>
                                <Form>
                                    <Field
                                        component={AbsenceReasonField}
                                        label={t("Grund")}
                                        name="reason"
                                        onBlur={submitForm}
                                    />
                                </Form>
                            </LoadingOverlay>
                        </Box>
                    </Collapse>
                </>
            }
        </Formik>
    );
};

export default Absence;
