import React, {memo, useState} from "react";
import {ErrorMessage, Field, Form as IkForm, Formik, FormikHelpers} from "formik";
import {
    Box,
    FormGroup,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    TextField as MUITextField,
    useTheme,
} from "@material-ui/core";
import {FocusedPage, FormikLessonField, PrimaryButton, renderDayWithLessonWeekdays} from "components";
import _ from "lodash";
import {DateTimePicker} from "formik-material-ui-pickers";
import {AiFillTool, BiTimer, MdClear, MdInfo} from "react-icons/all";
import {CheckboxWithLabel, TextField} from "formik-material-ui";
import {Autocomplete} from "formik-material-ui-lab";
import {useTranslation} from "react-i18next";
import {ISendHomeworkData, ISendHomeworkResponse} from "hooks/apis";
import * as yup from "yup";
import dayjs, {Dayjs} from "dayjs";
import {useQueryString} from "hooks";
import {LessonFieldRef} from "components/inputs/LessonField";

export interface IForm {
    onTypeChange: (newType: string) => any;
    onSubmit: (data: ISendHomeworkData, formikHelpers: FormikHelpers<ISendHomeworkData>) => ISendHomeworkResponse;
    typeAutocompletions: {
        text: string;
        inputValue?: string;
    }[];
}

interface FormikForm {
    lesson: string | null;
    isPrivate: boolean;
    dueDate: Dayjs | null;
    information: string;
    type: string;
}

const schema = yup.object({
    isPrivate: yup.boolean(),
    lesson: yup.string().required(),
    information: yup.string().nullable(),
    type: yup.object({
        text: yup.string(),
    }).nullable(),
    dueDate: yup.date().min(dayjs()).nullable(),
});

const Form = ({
    onSubmit,
    onTypeChange,
    typeAutocompletions,
}: IForm) => {
    const {
        lesson: lessonId,
    } = useQueryString({
        parseBooleans: false,
        parseNumbers: false,
    });
    const {t} = useTranslation();
    const theme = useTheme();

    const [$lesson, set$Lesson] = useState<LessonFieldRef>();

    const iconColor = theme.palette.text.secondary;
    const lessonWeeks = $lesson?.lesson?.lessonData?.weekdays;
    const lessonColor = $lesson?.lesson?.lessonData?.course?.subject?.userRelation?.color;
    const renderDay = (lessonWeeks && lessonColor)
        ? renderDayWithLessonWeekdays(
            lessonWeeks,
            lessonColor,
            (date) => Boolean(date && date.isAfter(dayjs())),
        )
        : undefined;

    return (
        <FocusedPage title={t("Hausaufgabe hinzufüge")}>
            <Formik<FormikForm>
                validationSchema={schema}
                initialValues={{
                    lesson: typeof lessonId === "string" ? lessonId : null,
                    dueDate: null,
                    information: "",
                    type: "",
                    isPrivate: false,
                }}
                onSubmit={onSubmit}
            >
                {({setFieldValue, touched, errors}) => (
                    <IkForm>
                        <Box mb={2}>
                            <Grid container spacing={4}>
                                <Grid item md={6}>
                                    <FormikLessonField
                                        innerRef={reference => {
                                            if (reference && !_.isEqual(reference, $lesson)) {
                                                set$Lesson(reference);
                                            }
                                        }}
                                        name="lesson"
                                        type="text"
                                        label={t("Stunde")}
                                        helpText={t("Von welcher Stunde aus die Hausaufgabe aufgegeben wurde.").toString()}
                                        onChange={value => setFieldValue("lesson", value)}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <Field
                                        required
                                        disablePast
                                        name="dueDate"
                                        inputVariant="outlined"
                                        format="lll"
                                        label={t("Fälligkeitsdatum")}
                                        component={DateTimePicker}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={event => {
                                                            event.stopPropagation();
                                                            setFieldValue("dueDate", null);
                                                        }}
                                                    >
                                                        <MdClear />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <BiTimer color={iconColor} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        renderDay={renderDay}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        multiline
                                        name="information"
                                        type="text"
                                        variant="outlined"
                                        label={t("Information")}
                                        component={TextField}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdInfo color={iconColor} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Field
                                        selectOnFocus
                                        clearOnBlur
                                        handleHomeEndKeys
                                        fullWidth
                                        freeSolo
                                        name="type"
                                        component={Autocomplete}
                                        getOptionLabel={option => option.text ?? ""}
                                        options={typeAutocompletions}
                                        renderInput={params =>
                                            <MUITextField
                                                {...params}
                                                fullWidth
                                                InputProps={{
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AiFillTool color={iconColor} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                name="type"
                                                label={t("Typ")}
                                                variant="outlined"
                                                error={Boolean(touched.type && errors.type)}
                                                helperText={touched.type && errors.type}
                                            />
                                        }
                                        filterOptions={(opts, params) => {
                                            const options = [...typeAutocompletions];
                                            const value = params.inputValue;

                                            // Suggest the creation of a new value
                                            if (value.length > 0) {
                                                options.push({
                                                    text: t("\"{{value}}\" hinzufügen", {
                                                        value,
                                                    }),
                                                    inputValue: value,
                                                });
                                                onTypeChange(value);
                                            }

                                            return options;
                                        }}
                                        onChange={(event, newValue) => {
                                            if (typeof newValue === "string") {
                                                setFieldValue("type", {
                                                    text: newValue,
                                                });
                                            } else if (newValue?.inputValue) {
                                                // Create a new value from the user input
                                                setFieldValue("type", {
                                                    text: newValue.inputValue,
                                                });
                                            } else {
                                                setFieldValue("type", newValue);
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="isPrivate"
                                            Label={{label: t("Privat?")}}
                                        />
                                        <FormHelperText error={Boolean(touched.isPrivate && errors.isPrivate)}>
                                            <ErrorMessage name="isPrivate" />
                                        </FormHelperText>
                                    </FormGroup>
                                </Grid>

                            </Grid>
                        </Box>
                        <PrimaryButton type="submit">
                            {t("Hausaufgabe hinzufügen")}
                        </PrimaryButton>
                    </IkForm>
                )}
            </Formik>
        </FocusedPage>
    );
};

export default memo(Form);
