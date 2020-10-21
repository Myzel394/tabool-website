import React, {useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {ClassNumberInput, PasswordInput, SimpleHelpTextWrapper, TeacherField, TextInput} from "components/inputs";
import {Grid, Typography} from "@material-ui/core";
import {PrimaryButton} from "components/buttons";
import {ErrorResponse} from "types";
import {TeacherApprox} from "types/teachers";
import validators from "common-validators";

import Form, {buildGrid} from "../../Form";

export interface SubmitState {
    teacher: string;
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
    const validateNotEmpty = (value) => {
        if (!validators.minLength(1, value?.length || 0)) {
            return t("Stelle sicher, dass das Feld nicht leer ist");
        }
    };

    const form =
        <Grid spacing={4} container>
            <Grid xs={12} item>
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
            <Grid xs={12} item>
                <Typography variant="overline">{t("Scooso-Daten")}</Typography>
                {buildGrid([
                    <SimpleHelpTextWrapper
                        key="scooso_username"
                        helpText={fields.scoosodata.username.helpText}
                    >
                        <TextInput
                            type="string"
                            label={fields.scoosodata.username.label}
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
                            errorMessages={[
                                ...errors?.username || [],
                                ...ownErrors?.scoosoPassword || [],
                            ]}
                            value={scoosoPassword}
                            validators={[validateNotEmpty]}
                            onChange={event => setScoosoPassword(event.target.value)}
                        />
                    </SimpleHelpTextWrapper>,
                ])}
            </Grid>
        </Grid>;
    const actions = useMemo(() =>
        <PrimaryButton type="submit">{t("Registrierung abschließen")}</PrimaryButton>,
    [t]);
    const handleSubmit = () => {
        // Check
        if (scoosoUsername.length === 0) {
            setOwnErrors(prevState => ({
                ...prevState,
                scoosoUsername: [t("Gib deinen Scooso-Benutzernamen ein")],
            }));
        }
        if (scoosoPassword.length === 0) {
            setOwnErrors(prevState => ({
                ...prevState,
                scoosoPassword: [t("Gib dein Scooso-Passwort ein")],
            }));
        }
        if (teacher === undefined || typeof teacher !== "object") {
            setOwnErrors(prevState => ({
                ...prevState,
                teacher: [t("Wähl einen Lehrer aus")],
            }));
            return;
        }

        if (Object.keys(ownErrors).length === 0) {
            onFillOut({
                scoosoUsername,
                scoosoPassword,
                classNumber,
                teacher: teacher?.id,
            });
        }
    };

    return (
        <Form
            headerTitle={t("Registrierung abschließen")}
            form={form}
            actions={actions}
            onSubmit={handleSubmit}
        />
    );
}
