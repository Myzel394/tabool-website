import React, {useMemo} from "react";
import {Box, Container, ContainerProps, SwipeableDrawer, SwipeableDrawerProps, useTheme} from "@material-ui/core";
import {isIOS} from "react-device-detect";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";

export interface IBottomSheet extends Omit<
    SwipeableDrawerProps,
    "disableSwipeToOpen" |
    "disableBackdropTransition" |
    "disableDiscovery" |
    "open" |
    "children" |
    "anchor" |
    "onOpen" |
    "onClose"
> {
    isOpen: SwipeableDrawerProps["open"];
    children: ContainerProps["children"];
    maxWidth?: Breakpoint;
    onClose?: SwipeableDrawerProps["onClose"];
}

const wrapperStyle = {
    borderRadius: "2em 2em 0 0",
};

const BottomSheet = ({
    children,
    maxWidth,
    isOpen,
    onClose,
    style: givenStyle,
    ...other
}: IBottomSheet) => {
    const theme = useTheme();
    const style = useMemo(() => ({
        ...givenStyle,
        borderRadius: theme.shape.borderRadius,
    }), [theme.shape.borderRadius, givenStyle]);

    return (
        <SwipeableDrawer
            {...other}
            disableSwipeToOpen
            anchor="bottom"
            open={isOpen}
            disableBackdropTransition={!isIOS}
            disableDiscovery={isIOS}
            style={wrapperStyle}
            PaperProps={{
                style: wrapperStyle,
            }}
            onClose={onClose ?? (() => null)}
            onOpen={() => null}
        >
            <Container maxWidth={maxWidth}>
                <Box p={2} style={style}>
                    {children}
                </Box>
            </Container>
        </SwipeableDrawer>
    );
};

BottomSheet.defaultProps = {
    maxWidth: "sm",
};

export default BottomSheet;
