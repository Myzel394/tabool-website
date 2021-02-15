import React, {memo, useMemo, useRef} from "react";
import {Box, IconButton, Paper, useTheme} from "@material-ui/core";
import {GoThreeBars} from "react-icons/all";
import {useElementSize} from "hooks";
import {DraggableProvidedDragHandleProps} from "react-beautiful-dnd";
import {Zoom} from "react-reveal";

import TransitionWrapper from "./TransitionWrapper";
import Content, {IContent} from "./Content";


export interface IField extends Omit<IContent, "forceEditMode"> {
    isElevated: boolean;
    reorder: boolean;
    containsErrors: boolean;
    disableAnimation: boolean;

    dragHandleProps?: DraggableProvidedDragHandleProps;
}


const Field = ({
    isElevated,
    reorder,
    dragHandleProps,
    containsErrors,
    isUpdating,
    disableAnimation,
    ...contentProps
}: IField) => {
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
                            <IconButton ref={$button} {...dragHandleProps}>
                                <GoThreeBars />
                            </IconButton>
                        </div>
                        <Content
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

export default memo(Field);
