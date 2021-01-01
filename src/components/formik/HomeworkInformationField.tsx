import React, {memo} from "react";
import {InputAdornment, TextField, TextFieldProps} from "@material-ui/core";
import {MdInfo} from "react-icons/all";
import {FieldProps} from "formik";
import {useTranslation} from "react-i18next";


export type IHomeworkInformationField = Omit<TextFieldProps, "multiline" | "variant" | "label" | "error"> & FieldProps;

const HomeworkInformationField = ({
    field,
    form,
    helperText,
    InputProps,
    ...other
}: IHomeworkInformationField) => {
    const {t} = useTranslation();

    const error = form.errors[field.name];

    return (
        <TextField
            {...field}
            {...other}
            multiline
            fullWidth
            variant="outlined"
            label={t("Information")}
            InputProps={{
                ...(InputProps ?? {}),
                startAdornment: (
                    <InputAdornment position="start">
                        <MdInfo />
                    </InputAdornment>
                ),
            }}
            error={Boolean(error)}
            helperText={error ? error : helperText}
        />
    );
};

export default memo(HomeworkInformationField);
