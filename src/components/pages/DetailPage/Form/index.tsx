import React from "react";
import {Form as IkForm, Formik, FormikConfig} from "formik";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import update from "immutability-helper";
import {Grid} from "@material-ui/core";

import Field, {IField} from "./Field";


export interface IForm <
    AvailableKeys extends string,
    FormikForm extends Record<AvailableKeys, any> = Record<AvailableKeys, any>,
>{
    initialValues: FormikConfig<FormikForm>["initialValues"];
    onSubmit: FormikConfig<FormikForm>["onSubmit"];
    data: Record<AvailableKeys, Omit<IField, "isUpdating" | "onReset" | "forceEditMode" | "isElevated" | "reorder" | "dragHandleProps" | "containsErrors" | "name" | "fieldPropsExtra"> & {
        nativeValue?: FormikForm[AvailableKeys];
        isEqual?: (oldValue: any, newValue: any) => boolean;
    }>;

    ordering: AvailableKeys[];
    elevatedKey: AvailableKeys | null;

    reorder: boolean;

    onOrderingChange: (ordering: AvailableKeys[]) => any;
    onElevatedKeyChange: (key: AvailableKeys | null) => any;

    validationSchema?: FormikConfig<FormikForm>["validationSchema"];
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
                            onSubmit={onSubmit}
                        >
                            {({
                                isSubmitting,
                                values,
                                errors,
                                setFieldValue,
                                getFieldProps,
                            }) =>
                                <IkForm>
                                    <Grid
                                        ref={provided.innerRef}
                                        container
                                        spacing={2}
                                        {...provided.droppableProps}
                                    >
                                        {ordering.map((key, index) => {
                                            const singleData = data[key];
                                            const {
                                                isEqual: rawIsEqual,
                                                nativeValue: rawNativeValue,
                                                ...fieldData
                                            } = singleData;
                                            const nativeValue = rawNativeValue ?? singleData.information;
                                            const isEqual = rawIsEqual ?? ((oldValue, newValue) => oldValue === newValue);

                                            const isElevated = elevatedKey === key;
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-ignore
                                            const isUpdating = isSubmitting && !isEqual(nativeValue, values[key]);

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
                                                                fieldPropsExtra={getFieldProps(key)}
                                                                isElevated={isElevated}
                                                                isUpdating={isUpdating}
                                                                reorder={reorder}
                                                                dragHandleProps={provided.dragHandleProps}
                                                                containsErrors={Boolean(errors[key])}
                                                                onReset={() => setFieldValue(key, nativeValue)}
                                                            />
                                                        </Grid>
                                                    }
                                                </Draggable>
                                            );
                                        })}
                                    </Grid>
                                </IkForm>
                            }
                        </Formik>
                        {provided.placeholder}
                    </>
                }
            </Droppable>
        </DragDropContext>
    );
};

export default Form;
