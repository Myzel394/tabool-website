import React, {memo} from "react";
import {useField} from "formik";
import {FormGroup, FormHelperText, FormLabel} from "@material-ui/core";
import {FieldConfig} from "formik/dist/Field";

import LessonField, {ILessonField} from "./LessonField";

export type IFormikLessonField = Omit<ILessonField, "value"> & Omit<FieldConfig<any>, "onChange"> & {
    label: string;
    helpText: string;
    innerRef?: any;
};

const FormikLessonField = ({
    label,
    helpText,
    innerRef,
    ...other
}: IFormikLessonField) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [field, meta] = useField(other);
    const isError = Boolean(meta.touched && meta.error);

    return (
        <FormGroup>
            <FormLabel>
                {label}
            </FormLabel>
            <LessonField ref={innerRef} isError={isError} {...field} {...other} />
            <FormHelperText error={isError}>
                {isError ? meta.error : helpText}
            </FormHelperText>
        </FormGroup>
    );
};

FormikLessonField.defaultProps = {
    helpText: "",
    label: "",
};

export default memo(FormikLessonField);
