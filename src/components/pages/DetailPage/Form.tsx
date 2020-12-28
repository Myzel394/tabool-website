import React from "react";
import {FormikConfig} from "formik";


export interface IForm <FormikForm = unknown>{
    initialValues: FormikConfig<FormikForm>;
    onSubmit: FormikConfig<FormikForm>;
}


const Form = <FormikForm extends any = unknown>({
    onSubmit,
    initialValues,
}: IForm<FormikForm>) => {
    return (
        <Formik<FormikForm>
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({}) =>

            }
        </Formik>
    );
};

export default Form;
