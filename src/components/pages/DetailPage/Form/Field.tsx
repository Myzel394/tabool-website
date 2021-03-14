import React, {useMemo, useRef} from "react";
import {Box, IconButton, Paper, useTheme} from "@material-ui/core";
import {GoThreeBars} from "react-icons/all";
import {useElementSize} from "hooks";
import {DraggableProvidedDragHandleProps} from "react-beautiful-dnd";
import {Zoom} from "react-reveal";

import TransitionWrapper from "./TransitionWrapper";
import Content, {IContent} from "./Content";


export interface IField<FormikForm> extends Omit<IContent<FormikForm>, "forceEditMode"> {
    isElevated: boolean;
    reorder: boolean;
    disableAnimation: boolean;

    dragHandleProps?: DraggableProvidedDragHandleProps;
}


const Field = <T extends any>({
    isElevated,
    reorder,
    dragHandleProps,
    isUpdating,
    disableAnimation,
    ...contentProps
}: IField<T>) => {
    const theme = useTheme();
    const $button = useRef<any>();
    const [buttonWidth] = useElementSize($button);

    const buttonStyle = useMemo(() => ({
        width: 0,
        transform: `translateX(calc(-${buttonWidth}px - 1px))`,
    }), [buttonWidth]);
    const paperStyle = useMemo(() => ({
        borderRadius: theme.shape.borderRadius,
        height: "100%",
        width: "100%",
        overflow: "hidden",
    }), [theme.shape.borderRadius]);
    const elevation = isElevated ? 5 : 1;

    const content = (
        <Paper
            elevation={elevation}
            style={paperStyle}
        >
            <TransitionWrapper active={reorder} offsetAmount={buttonWidth}>
                {style => (
                    <Box
                        display="flex"
                        alignItems="center"
                        p={2}
                        style={style}
                    >
                        <div style={buttonStyle}>
                            <IconButton ref={$button} disabled={!reorder} {...dragHandleProps}>
                                <GoThreeBars />
                            </IconButton>
                        </div>
                        <Content<T>
                            {...contentProps}
                            isUpdating={isUpdating}
                        />
                    </Box>
                )}
            </TransitionWrapper>
        </Paper>
    );

    if (disableAnimation) {
        return content;
    }

    return (
        <Zoom duration={theme.transitions.duration.enteringScreen}>
            {content}
        </Zoom>
    );
};

export default Field;
