import React from "react";
import {Field, Form, Formik, FormikConfig} from "formik";
import {ToggleButton} from "@material-ui/lab";
import {ToggleButtonGroup} from "formik-material-ui-lab";
import {LoadingOverlay} from "components";

import * as changeRelation from "./changeRelation";

export interface ValueType {

    /* Single element or array of elements meaning: [Element when not active, Element when active] */
    icon: JSX.Element | [JSX.Element, JSX.Element];
    isActive: boolean;
    title: string;
}

interface ValuesForm<T> {
    values: T;
}


export interface IToggleButtonsForm<
    AvailableKeys extends string,
> {
    values: Record<AvailableKeys, ValueType>;
    onSubmit: FormikConfig<Record<AvailableKeys, boolean>>["onSubmit"];

    validationSchema?: FormikConfig<Record<AvailableKeys, boolean>>["validationSchema"];
}


const RelationForm = <
    AvailableKeys extends string,
>({
        onSubmit,
        values,
        validationSchema,
    }: IToggleButtonsForm<AvailableKeys>) => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const elements: [AvailableKeys, ValueType][] = Object.entries<ValueType>(values);
    const plainValues = elements
        .reduce<Record<AvailableKeys, boolean>>(
            (object, [key, {isActive}]) => ({
                ...object,
                [key]: isActive,
            }), {} as Record<AvailableKeys, boolean>,
        );

    const initialValues = {
        values: changeRelation.toArray(plainValues),
    };

    return (
        <Formik<ValuesForm<AvailableKeys[]>>
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values, helpers) => onSubmit(
                changeRelation.toObject<AvailableKeys>(values.values, Object.keys(plainValues) as AvailableKeys[]),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                helpers,
            )}
        >
            {({isSubmitting, setFieldValue, submitForm}) =>
                <>
                    <LoadingOverlay isLoading={isSubmitting}>
                        <Form>
                            <Field
                                component={ToggleButtonGroup}
                                name="values"
                                type="checkbox"
                                onChange={(event, newValues) => {
                                    setFieldValue("values", newValues);
                                    submitForm();
                                }}
                            >
                                {elements.map(([name, {icon, isActive, title}]) =>
                                    <ToggleButton key={name} value={name}>
                                        {Array.isArray(icon)
                                            ? icon[Number(isActive)]
                                            : icon
                                        }
                                        {title}
                                    </ToggleButton>)}
                            </Field>
                        </Form>
                    </LoadingOverlay>
                </>
            }
        </Formik>
    );
};

export default RelationForm;
