import React, {memo, useContext, useMemo, useRef, useState} from "react";
import {Box, Grid, IconButton, Paper, Typography, useTheme} from "@material-ui/core";
import {GoThreeBars} from "react-icons/all";
import {DraggableProvidedDragHandleProps} from "react-beautiful-dnd";
import {useElementSize} from "hooks";
import {Transition} from "react-transition-group";

import DetailContext from "./DetailContext";

export interface IInformation {
    icon: JSX.Element;
    title: string;
    information: string;
    key: string;

    dragHandleProps?: DraggableProvidedDragHandleProps;
    isElevated?: boolean;
}

const ANIMATION_DURATION = 300;

const Information = ({icon, title, information, isElevated, dragHandleProps}: IInformation) => {
    const {enableReordering} = useContext(DetailContext);
    const theme = useTheme();
    const [animationDuration, setAnimationDuration] = useState<number>(0);
    const style = useMemo(() => ({
        borderRadius: theme.shape.borderRadius,
        height: "100%",
        width: "100%",
        overflow: "hidden",
    }), [theme.shape.borderRadius]);
    const $button = useRef<any>();
    const [buttonWidth, buttonHeight] = useElementSize($button);
    const transitionStyles = useMemo(() => ({
        exiting: {
            transform: `translateX(-${(buttonWidth ?? 0) + 1}px)`,
        },
        exited: {
            transform: `translateX(-${(buttonWidth ?? 0) + 1}px)`,
        },
        entering: {
            transform: "none",
        },
        entered: {
            transform: "none",
        },
    }), [buttonWidth]);
    const defaultStyle = useMemo(() => ({
        transition: `${animationDuration}ms`,
        willChange: "transform",
    }), [animationDuration]);
    const elevation = (() => {
        let value = 1;

        if (isElevated) {
            value += 4;
        }

        return value;
    })();

    return (
        <Paper
            elevation={elevation}
            style={style}
        >
            <Transition
                in={enableReordering}
                timeout={animationDuration}
                onEnter={() => {
                    if (animationDuration !== ANIMATION_DURATION) {
                        setAnimationDuration(ANIMATION_DURATION);
                    }
                }}
            >
                {state => (
                    <div
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}
                    >
                        <Box
                            p={2} display="flex" alignItems="center"
                        >
                            <div ref={$button}>
                                <IconButton {...dragHandleProps}>
                                    <GoThreeBars />
                                </IconButton>
                            </div>
                            <Box px={2}>
                                <Grid
                                    container spacing={2} direction="column"
                                >
                                    <Grid item>
                                        <Typography
                                            component="dt"
                                            variant="h5"
                                            color="textSecondary"
                                        >
                                            <Box display="flex" flexDirection="row" alignItems="center">
                                                {icon}
                                                <Box ml={1} component="span">
                                                    {title}
                                                </Box>
                                            </Box>
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            component="dd"
                                            variant="body1"
                                        >
                                            {information}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </div>
                )}
            </Transition>
        </Paper>
    );
};

export default memo(Information);
