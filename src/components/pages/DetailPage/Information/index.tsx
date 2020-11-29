import React, {memo, useMemo, useRef} from "react";
import {Box, IconButton, Paper, useTheme} from "@material-ui/core";
import {GoThreeBars} from "react-icons/all";
import {DraggableProvidedDragHandleProps} from "react-beautiful-dnd";
import {useElementSize} from "hooks";

import Content, {IContent} from "./Content";
import TransitionWrapper from "./TransitionWrapper";

export interface IInformation extends Omit<IContent, "showEdit"> {
    reorder: boolean;
    isElevated: boolean;

    dragHandleProps?: DraggableProvidedDragHandleProps;
}

const Information = ({
    icon,
    title,
    information,
    isElevated,
    dragHandleProps,
    input,
    forceEdit,
    onEditModeLeft,
    isUpdating,
    disableShowMore,
    helpText,
    errors,
    reset,
    reorder,
    subInformation,
}: IInformation) => {
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
                            disableShowMore={disableShowMore}
                            isUpdating={isUpdating}
                            information={information}
                            input={input}
                            forceEdit={forceEdit}
                            showEdit={(errors ?? []).length > 0}
                            title={title}
                            icon={icon}
                            helpText={helpText}
                            errors={errors}
                            reset={reset}
                            subInformation={subInformation}
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
