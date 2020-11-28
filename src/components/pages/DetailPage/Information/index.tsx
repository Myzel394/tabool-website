import React, {memo, useMemo, useRef} from "react";
import {Box, IconButton, Paper, useTheme} from "@material-ui/core";
import {GoThreeBars} from "react-icons/all";
import {DraggableProvidedDragHandleProps} from "react-beautiful-dnd";
import {useElementSize} from "hooks";

import {Form} from "../DetailContext";

import Content from "./Content";
import TransitionWrapper from "./TransitionWrapper";

export interface IInformation {
    icon: JSX.Element;
    title: string;
    information: string;
    key: string;

    forceEdit: boolean;

    dragHandleProps?: DraggableProvidedDragHandleProps;
    isElevated?: boolean;
    form?: Form;
    onEditModeLeft?: () => any;
}

const Information = ({icon, title, information, isElevated, dragHandleProps, form, forceEdit, onEditModeLeft}: IInformation) => {
    const $button = useRef<any>();
    const theme = useTheme();
    const [buttonWidth, buttonHeight] = useElementSize($button);
    const buttonStyle = useMemo(() => ({
        width: 0,
        transform: `translateX(calc(-${buttonWidth}px - 1px))`,
    }), [buttonWidth]);
    const style = useMemo(() => ({
        borderRadius: theme.shape.borderRadius,
        height: "100%",
        width: "100%",
        overflow: "hidden",
    }), [theme.shape.borderRadius]);
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
            <TransitionWrapper offsetAmount={buttonWidth}>
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
                            icon={icon}
                            title={title}
                            information={information}
                            form={form}
                            forceEdit={forceEdit}
                            onEditModeLeft={onEditModeLeft}
                        />
                    </Box>
                )}
            </TransitionWrapper>
        </Paper>
    );
};

Information.defaultProps = {
    forceEdit: false,
};

export default memo(Information);
