import React from "react";
import {StudentDetail} from "types";
import {Box, CircularProgress, FormControl, InputLabel, MenuItem, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {Alert} from "@material-ui/lab";
import {Field} from "formik";
import {Select} from "formik-material-ui";
import {GenderStatus} from "components";


export interface StudentsProps {
    isError: boolean;
    hasLessonSelected: boolean;

    students?: StudentDetail[];
}

const Students = ({
    students,
    hasLessonSelected,
    isError,
}: StudentsProps) => {
    const {t} = useTranslation();

    if (!hasLessonSelected) {
        return (
            <Alert severity="warning">
                {t("Wähle eine Stunde aus")}
            </Alert>
        );
    }

    if (!students) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center">
                <Box mr={1}>
                    <CircularProgress size="1rem" />
                </Box>
                <Typography>
                    {t("Schülerliste wird geladen")}
                </Typography>
            </Box>
        );
    }

    if (!students && isError) {
        return (
            <Alert severity="error">
                {t("Es gab einen Fehler")}
            </Alert>
        );
    }

    return (
        <Box mt={2}>
            <FormControl
                fullWidth
                variant="outlined"
            >
                <InputLabel>
                    {t("Schüler")}
                </InputLabel>
                <Field
                    component={Select}
                    defaultValue=""
                    type="radio"
                    name="privateToStudentId"
                    label={t("Schüler")}
                >
                    {students.map(student =>
                        <MenuItem key={student.id} value={student.id}>
                            {/* eslint-disable-next-line @shopify/jsx-no-hardcoded-content */}
                            <Box display="flex" alignItems="center">
                                <GenderStatus justIcon withColor value={student.gender} />
                                {`${student.firstName} ${student.lastName}`}
                            </Box>
                        </MenuItem>)}
                </Field>
            </FormControl>
        </Box>
    );
};

export default Students;
