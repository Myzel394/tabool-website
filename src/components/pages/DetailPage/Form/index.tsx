import React, {useState} from "react";
import {Form as IkForm, Formik, FormikConfig} from "formik";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import update from "immutability-helper";
import {Grid} from "@material-ui/core";
import {FormikHelpers} from "formik/dist/types";

import {BooleanStatus} from "../../../statuses";

import Field, {IField} from "./Field";


type RecordField = Omit<IField,
    "isUpdating" |
    "onReset" |
    "name" |
    "isElevated" |
    "reorder" |
    "dragHandleProps" |
    "containsErrors" |
    "onSubmit" |
    "value" |
    "hasChanged" |
    "formik" |
    "isEditModeActive" |
    "onChangeEditModeActive"
>;

const renderValue = (value: any, information: any): JSX.Element | string => {
    if (typeof value === "boolean") {
        return <BooleanStatus value={value} />;
    } else if (value === null || value === undefined) {
        return "-";
    } else {
        return information;
    }
};


export interface IForm <
    AvailableKeys extends string,
    FormikForm extends Record<AvailableKeys, any> = Record<AvailableKeys, any>,
>{
    initialValues: FormikConfig<FormikForm>["initialValues"];
    data: Record<AvailableKeys, RecordField & {
        nativeValue?: FormikForm[AvailableKeys];
        isEqual?: (oldValue: any, newValue: any) => boolean;
        onSubmit?: (value: unknown) => void | Promise<void>;
    }>;

    ordering: AvailableKeys[];
    elevatedKey: AvailableKeys | null;

    reorder: boolean;

    onOrderingChange: (ordering: AvailableKeys[]) => any;
    onElevatedKeyChange: (key: AvailableKeys | null) => any;

    validationSchema?: FormikConfig<FormikForm>["validationSchema"];
    onSubmit?: (values: FormikForm, formikHelpers: FormikHelpers<FormikForm>) => Promise<any>;
}


const Form = <
    AvailableKeys extends string,
    FormikForm extends Record<AvailableKeys, any> = Record<AvailableKeys, any>,
>({
        onSubmit,
        initialValues,
        data,
        elevatedKey,
        onElevatedKeyChange,
        onOrderingChange,
        ordering,
        reorder,
        validationSchema,
    }: IForm<AvailableKeys, FormikForm>) => {
    const [editModeActive, setEditModeActive] = useState<AvailableKeys[]>([]);

    const onDragStart = (initial) => {
        const {draggableId} = initial;
        onElevatedKeyChange(draggableId);
    };

    const onDragEnd = (result: DropResult) => {
        onElevatedKeyChange(null);

        // Update ordering
        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }

        if (destination.index === source.index) {
            return;
        }

        const newState = update(
            ordering,
            {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                $splice: [
                    [source.index, 1],
                    [destination.index, 0, draggableId],
                ],

            },
        );
        onOrderingChange(newState);
    };

    const toggleEditMode = (key, value) => {
        const newEditModeActive = new Set([...editModeActive]);

        if (value) {
            newEditModeActive.add(key);
        } else {
            newEditModeActive.delete(key);
        }

        setEditModeActive(Array.from(newEditModeActive));
    };

    return (
        <DragDropContext
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <Droppable droppableId="detail_page_data">
                {provided =>
                    <>
                        <Formik<FormikForm>
                            enableReinitialize
                            validationSchema={validationSchema}
                            initialValues={initialValues}
                            onSubmit={(values, helpers) => {
                                if (onSubmit) {
                                    return onSubmit(values, helpers)
                                        .then(() => setEditModeActive([]));
                                }
                            }}
                        >
                            {formik => {
                                const {
                                    isSubmitting,
                                    values,
                                    errors,
                                    setFieldValue,
                                    getFieldProps,
                                } = formik;

                                return (
                                    <IkForm>
                                        <Grid
                                            ref={provided.innerRef}
                                            container
                                            spacing={2}
                                            {...provided.droppableProps}
                                        >
                                            {ordering.map((key, index) => {
                                                // Get values
                                                const singleData = data[key];
                                                const {
                                                    isEqual: rawIsEqual,
                                                    nativeValue: rawNativeValue,
                                                    onSubmit: onSubmitField,
                                                    ...fieldData
                                                } = singleData;
                                                const nativeValue = rawNativeValue ?? singleData.information;
                                                const isEqual = rawIsEqual ?? ((oldValue, newValue) => oldValue === newValue);

                                                const isElevated = elevatedKey === key;
                                                const hasChanged = !isEqual(nativeValue, values[key]);
                                                const isUpdating = isSubmitting && hasChanged;
                                                const isEditModeActive = editModeActive.includes(key);

                                                return (
                                                    <Draggable
                                                        key={key}
                                                        index={index}
                                                        draggableId={key}
                                                    >
                                                        {provided =>
                                                            <Grid
                                                                ref={provided.innerRef}
                                                                item
                                                                xs={12}
                                                                {...provided.draggableProps}
                                                            >
                                                                <Field
                                                                    {...fieldData}
                                                                    information={renderValue(nativeValue, singleData.information)}
                                                                    containsErrors={errors[key] !== undefined}
                                                                    fieldPropsExtra={getFieldProps(key)}
                                                                    isUpdating={isUpdating}
                                                                    reorder={reorder}
                                                                    dragHandleProps={provided.dragHandleProps}
                                                                    isElevated={isElevated}
                                                                    value={nativeValue}
                                                                    formik={formik}
                                                                    hasChanged={hasChanged}
                                                                    name={key}
                                                                    isEditModeActive={isEditModeActive}
                                                                    onChangeEditModeActive={async value => {
                                                                        if (value) {
                                                                            toggleEditMode(key, value);
                                                                        } else {
                                                                            const promise = onSubmitField?.(value);

                                                                            if (Promise.resolve(promise) === promise) {
                                                                                try {
                                                                                    await promise;
                                                                                } catch (x) {
                                                                                    return;
                                                                                }
                                                                            }

                                                                            toggleEditMode(key, value);
                                                                        }
                                                                    }}
                                                                    onReset={() => setFieldValue(key, nativeValue)}
                                                                />
                                                            </Grid>
                                                        }
                                                    </Draggable>
                                                );
                                            })}
                                        </Grid>
                                    </IkForm>
                                );
                            }}
                        </Formik>
                        {provided.placeholder}
                    </>
                }
            </Droppable>
        </DragDropContext>
    );
};

export default Form;
