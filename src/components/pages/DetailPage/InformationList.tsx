import React, {memo, useContext} from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import {Grid} from "@material-ui/core";
import update from "immutability-helper";

import Information from "./Information";
import DetailContext from "./DetailContext";

const InformationList = () => {
    const {setElevatedKey, ordering, setOrdering, data, elevatedKey, enableReordering} = useContext(DetailContext);
    const onDragEnd = (result: DropResult) => {
        setElevatedKey(undefined);
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
                $splice: [
                    [source.index, 1],
                    [destination.index, 0, draggableId],
                ],
            },
        );
        setOrdering(newState);
    };

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
            onDragStart={initial => {
                const {draggableId} = initial;
                setElevatedKey(draggableId);
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
                            const information = data[key];
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
                                                icon={information.icon}
                                                title={information.title}
                                                information={information.information}
                                                isElevated={isElevated}
                                                dragHandleProps={provided.dragHandleProps}
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

export default memo(InformationList);
