import React, {memo} from "react";
import {Box, Container, Grid, Paper, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import dayjs, {Dayjs} from "dayjs";
import {Field, Form, Formik} from "formik";
import {CheckboxWithLabel} from "formik-material-ui";
import * as yup from "yup";
import {LessonField} from "components";

interface Form {
    lesson: string;
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

const HomeworkAddPage = ({match: {params: {lesson}}}) => {
    const {t} = useTranslation();

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
                            lesson,
                            dueDate: null,
                            information: null,
                            type: null,
                            isPrivate: false,
                        }}
                        onSubmit={async (data) => {
                            // eslint-disable-next-line no-console
                            console.log(data);
                        }}
                    >
                        {({values, setFieldValue}) => (
                            <>
                                <Form>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <LessonField
                                                value={values.lesson}
                                                minDate={dayjs().subtract(16, "day")}
                                                onChange={lesson => setFieldValue("lesson", lesson)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Field
                                        component={CheckboxWithLabel}
                                        type="checkbox"
                                        name="isPrivate"
                                        Label={{label: t("Privat?")}}
                                    />
                                </Form>
                                <pre>
                                    {JSON.stringify(values, null, 4)}
                                </pre>
                            </>
                        )}
                    </Formik>
                </Box>
            </Paper>
        </Container>
    );
};

export default memo(HomeworkAddPage);
