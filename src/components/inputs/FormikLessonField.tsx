import React, {memo} from "react";
import {FieldProps} from "formik";
import {FormControl, FormHelperText, FormLabel} from "@material-ui/core";

import LessonField, {ILessonField} from "./LessonField";

export type IFormikLessonField = Omit<ILessonField, "value"> & FieldProps & {
    label: string;
    helpText: string;
    innerRef?: any;
};

const FormikLessonField = ({
    label,
    helpText,
    innerRef,
    field,
    form,
    ...other
}: IFormikLessonField) => {
    const error = form.touched[field.name] && form.errors[field.name];

    return (
        <FormControl>
            <FormLabel>
                {label}
            </FormLabel>
            <LessonField ref={innerRef} isError={Boolean(error)} {...field} {...other} />
            <FormHelperText error={Boolean(error)}>
                {error ?? helpText}
            </FormHelperText>
        </FormControl>
    );
};

FormikLessonField.defaultProps = {
    helpText: "",
    label: "",
};

export default memo(FormikLessonField);
