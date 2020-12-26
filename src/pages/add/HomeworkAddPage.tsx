import React, {memo} from "react";
import {Box, Container, FormGroup, FormHelperText, Grid, IconButton, Paper, Typography, TextField as MUITextField} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import dayjs, {Dayjs} from "dayjs";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {CheckboxWithLabel, TextField} from "formik-material-ui";
import {DateTimePicker} from "formik-material-ui-pickers";
import * as yup from "yup";
import {FormikLessonField, PrimaryButton} from "components";
import {useQueryString} from "hooks";
import {MdClear} from "react-icons/all";
import {Autocomplete} from "@material-ui/lab";

interface Form {
    lesson: string | null;
    isPrivate: boolean;
    dueDate: Dayjs | null;
    information: string | null;
    type: string | null;
}

const schema = yup.object({
    isPrivate: yup.boolean().required(),
    lesson: yup.string().required(),
    information: yup.string().nullable(),
    type: yup.string().nullable(),
    dueDate: yup.date().min(dayjs()).nullable(),
});

const HomeworkAddPage = (props) => {
    const {t} = useTranslation();
    const {
        lesson,
    } = useQueryString({
        parseBooleans: false,
        parseNumbers: false,
    });


    return (
        <Container maxWidth="md">
            <Paper>
                <Box m={2} p={2}>
                    <Typography variant="h2">
                        {t("Hausaufgabe hinzufügen")}
                    </Typography>
                    <Formik<Form>
                        validationSchema={schema}
                        initialValues={{
                            lesson: typeof lesson === "string" ? lesson : null,
                            dueDate: null,
                            information: null,
                            type: null,
                            isPrivate: false,
                        }}
                        onSubmit={async (data, {setErrors}) => {
                            // eslint-disable-next-line no-console
                            console.log(data);
                            setErrors({
                                isPrivate: "Bla",
                                lesson: "Blaaaaaa",
                            });
                        }}
                    >
                        {({values, setFieldValue}) => {
                            // eslint-disable-next-line no-console
                            console.log(values);
                            return (
                                <>
                                    <Form>
                                        <Grid container spacing={4}>
                                            <Grid item xs={12}>
                                                <FormikLessonField
                                                    name="lesson"
                                                    type="text"
                                                    label={t("Stunde")}
                                                    helpText={t("Von welcher Stunde aus die Hausaufgaben aufgegeben wurde").toString()}
                                                    allowedWeekdays={[1, 2, 4]}
                                                    onChange={value => setFieldValue("lesson", value)}
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
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <Autocomplete
                                                    value={values.type}
                                                    renderInput={params =>
                                                        <MUITextField
                                                            {...params}
                                                            fullWidth
                                                            name="type"
                                                            label={t("Typ")}
                                                            variant="outlined"
                                                        />
                                                    }
                                                    options={[]}
                                                    onChange={(event, value) => setFieldValue("type", value)}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <Field
                                                    disablePast
                                                    name="dueDate"
                                                    type="date"
                                                    inputVariant="outlined"
                                                    format="yyyy.MM.DD"
                                                    label={t("Fälligkeitsdatum")}
                                                    component={DateTimePicker}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <IconButton
                                                                onClick={event => {
                                                                    event.stopPropagation();
                                                                    setFieldValue("dueDate", null);
                                                                }}
                                                            >
                                                                <MdClear />
                                                            </IconButton>
                                                        ),
                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <FormGroup>
                                            <Field
                                                component={CheckboxWithLabel}
                                                type="checkbox"
                                                name="isPrivate"
                                                Label={{label: t("Privat?")}}
                                            />
                                            <FormHelperText error>
                                                <ErrorMessage name="isPrivate" />
                                            </FormHelperText>
                                        </FormGroup>
                                        <PrimaryButton type="submit">
                                            {t("Hausaufgabe hinzufügen")}
                                        </PrimaryButton>
                                    </Form>
                                    <pre>
                                        {JSON.stringify(values, null, 4)}
                                    </pre>
                                </>
                            );
                        }}
                    </Formik>
                </Box>
            </Paper>
        </Container>
    );
};

export default memo(HomeworkAddPage);
