/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import {Grid} from "@material-ui/core";
import update from "immutability-helper";
import {Formik} from "formik";

import Information from "./Information";
import {IContent} from "./Information/Content";

export interface Data {
    information: string | JSX.Element;
    title: string;
    icon: JSX.Element;

    field?: IContent["field"];
    disableShowMore?: boolean;
    subInformation?: JSX.Element;
}

export interface IInformationList<AvailableKeys extends string = string> {
    ordering: AvailableKeys[];
    reorder: boolean;
    data: {
        [key in AvailableKeys]: Data;
    };

    elevatedKey?: AvailableKeys | null;

    setOrdering?: (ordering: AvailableKeys[]) => any;
    setElevatedKey?: (key: AvailableKeys | null) => any;
}


const InformationList = <AvailableKeys extends string = string>({
    data,
    elevatedKey,
    ordering,
    setElevatedKey,
    setOrdering,
    reorder,
}: IInformationList<AvailableKeys>) => {
    const onDragEnd = (result: DropResult) => {
        if (setElevatedKey) {
            setElevatedKey(null);
        }
        if (setOrdering) {
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
                    // @ts-ignore
                    $splice: [
                        [source.index, 1],
                        [destination.index, 0, draggableId],
                    ],

                },
            );
            setOrdering(newState);
        }
    };

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
            onDragStart={initial => {
                if (setElevatedKey) {
                    const {draggableId} = initial;
                    // @ts-ignore
                    setElevatedKey(draggableId);
                }
            }}
        >
            <Droppable droppableId="information">
                {provided => (
                    <Grid
                        ref={provided.innerRef}
                        container
                        spacing={2}
                        {...provided.droppableProps}
                    >
                        <Formik>
                            {({}) =>
                                ordering.map((key, index) => {
                                    const {
                                        title,
                                        subInformation,
                                        information,
                                        icon,
                                        field,
                                        disableShowMore,
                                    } = data[key];
                                    const isElevated = key === elevatedKey;

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
                                                    <Information
                                                        subInformation={subInformation}
                                                        title={title}
                                                        information={information}
                                                        isElevated={isElevated}
                                                        icon={icon}
                                                        reorder={reorder}
                                                        dragHandleProps={provided.dragHandleProps}
                                                        disableShowMore={disableShowMore}
                                                        field={field}
                                                    />
                                                </Grid>
                                            }
                                        </Draggable>
                                    );
                                })
                            }
                        </Formik>
                        {provided.placeholder}
                    </Grid>
                ) }
            </Droppable>
        </DragDropContext>
    );
};

InformationList.defaultProps = {
    reorder: false,
};

export default memo(InformationList);
