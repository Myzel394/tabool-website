/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {memo} from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import {Grid} from "@material-ui/core";
import update from "immutability-helper";

import Information from "./Information";

export interface Data {
    information: string | JSX.Element;
    title: string;
    icon: JSX.Element;

    reset?: () => any;
    isUpdating?: boolean;
    input?: JSX.Element;
    onEditModeLeft?: () => any;
    disableShowMore?: boolean;
    helpText?: string;
    subInformation?: JSX.Element;
}

export interface IInformationList<AvailableKeys extends string = string> {
    ordering: AvailableKeys[];
    reorder: boolean;
    data: {
        [key in AvailableKeys]: Data;
    };

    forceEdit?: AvailableKeys[];
    errors?: {
        [key in AvailableKeys]: string[];
    };
    elevatedKey?: AvailableKeys | null;

    setOrdering?: (ordering: AvailableKeys[]) => any;
    setElevatedKey?: (key: AvailableKeys | null) => any;
}


const InformationList = <AvailableKeys extends string = string>({
    data,
    elevatedKey,
    errors,
    forceEdit,
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
                        [destination.index - 1, 0, draggableId],
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
                        {ordering.map((key, index) => {
                            const informationData = data[key];
                            const {
                                isUpdating = false,
                                onEditModeLeft,
                                information,
                                title,
                                icon,
                                input,
                                disableShowMore,
                                helpText,
                                reset,
                                subInformation,
                            } = informationData;
                            const givenErrors = errors?.[key];
                            const forceEditMode = forceEdit?.includes(key) ?? false;
                            const isElevated = key === elevatedKey;

                            return (
                                <Draggable
                                    key={key}
                                    index={index}
                                    draggableId={key}
                                >
                                    {provided => (
                                        <Grid
                                            ref={provided.innerRef}
                                            item
                                            xs={12}
                                            {...provided.draggableProps}
                                        >
                                            <Information
                                                key={key}
                                                subInformation={subInformation}
                                                errors={givenErrors}
                                                title={title}
                                                information={information}
                                                isElevated={isElevated}
                                                icon={icon}
                                                reset={reset}
                                                reorder={reorder}
                                                input={input}
                                                dragHandleProps={provided.dragHandleProps}
                                                forceEdit={forceEditMode}
                                                disableShowMore={disableShowMore}
                                                helpText={helpText}
                                                isUpdating={isUpdating}
                                                onEditModeLeft={onEditModeLeft}
                                            />
                                        </Grid>
                                    )}
                                </Draggable>
                            );
                        }) }
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
