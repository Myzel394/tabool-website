import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {ClassNumberInput, PasswordInput, SimpleHelpTextWrapper, TeacherField, TextInput} from "components/inputs";
import {Grid, Typography} from "@material-ui/core";
import {PrimaryButton} from "components/buttons";
import {ErrorResponse} from "types";
import {TeacherApprox} from "types/teachers";
import {NonFieldErrors} from "components/forms";
import Form, {buildGrid} from "components/forms/Form";
import {useNotEmptyValidator} from "hooks/validators";

export interface SubmitState {
    teacher: TeacherApprox;
    classNumber: number;
    scoosoUsername: string;
    scoosoPassword: string;
}

export interface IFillOutDataForm {
    fields: any;
    errors: ErrorResponse;
    onFillOut: ({teacher, classNumber, scoosoUsername, scoosoPassword}: SubmitState) => void;
}

export default function FillOutDataForm({fields, errors, onFillOut}: IFillOutDataForm) {
    const {t} = useTranslation();

    const [ownErrors, setOwnErrors] = useState<ErrorResponse>({});
    const [teacher, setTeacher] = useState<TeacherApprox>(),
        [classNumber, setClassNumber] = useState<number>(fields.student.classNumber.choices[0].value),
        [scoosoUsername, setScoosoUsername] = useState<string>(""),
        [scoosoPassword, setScoosoPassword] = useState<string>("");

    const validateNotEmpty = useNotEmptyValidator();
    const handleSubmit = () => {
        // Validate data
        // Reset
        setOwnErrors({});
        let tempErrors = {};

        // Check
        if (teacher === undefined || typeof teacher !== "object") {
            tempErrors = {
                ...tempErrors,
                teacher: [t("Wähl einen Lehrer aus")],
            };
        }

        setOwnErrors(tempErrors);

        if (Object.keys(tempErrors).length === 0 && teacher !== undefined) {
            onFillOut({
                teacher,
                classNumber,
                scoosoUsername,
                scoosoPassword,
            });
        }
    };

    return (
        <Form
            form={
                <>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="overline">{t("Schülerdaten")}</Typography>
                            {buildGrid([
                                <div key="teacher">
                                    <TeacherField
                                        value={teacher}
                                        errorMessages={ownErrors?.teacher}
                                        onChange={value => setTeacher(value)}
                                    />
                                </div>,
                                <ClassNumberInput
                                    key="class"
                                    label={fields.student.classNumber.label}
                                    helpText={fields.student.classNumber.helpText}
                                    required={fields.student.classNumber.required}
                                    choices={fields.student.classNumber.choices}
                                    value={classNumber}
                                    onChange={value => setClassNumber(value)}
                                />,
                            ])}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="overline">{t("Scooso-Daten")}</Typography>
                            {buildGrid([
                                <SimpleHelpTextWrapper
                                    key="scooso_username"
                                    helpText={fields.scoosodata.username.helpText}
                                >
                                    <TextInput
                                        type="string"
                                        label={fields.scoosodata.username.label}
                                        required={fields.scoosodata.username.required}
                                        minLength={fields.scoosodata.username.minLength}
                                        errorMessages={[
                                            ...errors?.username || [],
                                            ...ownErrors?.scoosoUsername || [],
                                        ]}
                                        value={scoosoUsername}
                                        validators={[validateNotEmpty]}
                                        onChange={event => setScoosoUsername(event.target.value)}
                                    />
                                </SimpleHelpTextWrapper>,
                                <SimpleHelpTextWrapper
                                    key="scooso_password"
                                    helpText={fields.scoosodata.password.helpText}
                                >
                                    <PasswordInput
                                        label={fields.scoosodata.password.label}
                                        required={fields.scoosodata.password.required}
                                        minLength={fields.scoosodata.password.minLength}
                                        errorMessages={[
                                            ...errors?.username || [],
                                            ...ownErrors?.scoosoPassword || [],
                                        ]}
                                        value={scoosoPassword}
                                        validators={[validateNotEmpty]}
                                        onChange={value => setScoosoPassword(value)}
                                    />
                                </SimpleHelpTextWrapper>,
                            ])}
                        </Grid>
                    </Grid>
                    {errors?.nonFieldErrors && <NonFieldErrors errors={errors.nonFieldErrors} /> }
                </>
            }
            actions={
                <PrimaryButton type="submit">{t("Registrierung abschließen")}</PrimaryButton>
            }
            onSubmit={handleSubmit}
        />
    );
}
