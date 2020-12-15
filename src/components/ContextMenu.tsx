import React, {ReactNode, useMemo, useRef} from "react";
import {ClickAwayListener, Grow, Paper, useTheme} from "@material-ui/core";
import {useElementSize, useWindowSize} from "hooks";

export interface IContextMenu {
    isOpen: boolean;
    children: ReactNode;
    left: number;
    top: number;
    onClose: () => any;
}

const ContextMenu = ({isOpen, children, left, top, onClose}: IContextMenu) => {
    const theme = useTheme();
    const $div = useRef<any>();
    const [windowWidth, windowHeight] = useWindowSize();
    const [width, height] = useElementSize($div);
    const style: any = useMemo(() => {
        const resultBound = {
            left,
            top,
        };
        const elementBound = {
            left,
            top,
            leftWidth: left + (width ?? 0),
            topHeight: top + (height ?? 0),
        };

        if (elementBound.leftWidth > windowWidth) {
            resultBound.left = Math.max(0, elementBound.left - (elementBound.leftWidth - windowWidth));
        }

        if (elementBound.topHeight > windowHeight) {
            resultBound.top = Math.max(0, elementBound.top - (elementBound.topHeight - windowHeight));
        }

        return {
            ...resultBound,
            position: "fixed" as "fixed",
            zIndex: theme.zIndex.appBar - 1,
            transformOrigin: "0 0",
        };
    }, [height, left, theme.zIndex.appBar, top, width, windowHeight, windowWidth]);

    return (
        <ClickAwayListener onClickAway={onClose}>
            <Grow in={isOpen} style={style} timeout={isOpen ? "auto" : 100}>
                <Paper ref={$div} elevation={12}>
                    {children}
                </Paper>
            </Grow>
        </ClickAwayListener>
    );
};

export default ContextMenu;
