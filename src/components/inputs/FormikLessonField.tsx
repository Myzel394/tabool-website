import React, {memo} from "react";
import {useField} from "formik";
import {FormControlLabel, FormHelperText} from "@material-ui/core";

import LessonField from "./LessonField";

const FormikLessonField = ({
    label,
    helpText,
    ...other
}: any) => {
    const [field, meta] = useField(other);

    return (
        <>
            <FormControlLabel
                control={
                    <LessonField {...field} />
                }
                label={label}
            />
            <FormHelperText error={Boolean(meta.touched && meta.error)}>
                {meta.touched ? meta.error : helpText}
            </FormHelperText>
        </>
    );
};

export default memo(FormikLessonField);
