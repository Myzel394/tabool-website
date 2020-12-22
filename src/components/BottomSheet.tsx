import React from "react";
import {Container, ContainerProps, SwipeableDrawer, SwipeableDrawerProps} from "@material-ui/core";
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
    "onOpen"
> {
    isOpen: SwipeableDrawerProps["open"];
    children: ContainerProps["children"];
    maxWidth?: Breakpoint;
}

const BottomSheet = ({children, maxWidth, isOpen, style: givenStyle, ...other}: IBottomSheet) => {
    return (
        <SwipeableDrawer
            {...other}
            disableSwipeToOpen
            anchor="bottom"
            open={isOpen}
            disableBackdropTransition={!isIOS}
            disableDiscovery={isIOS}
            onOpen={() => null}
        >
            <Container maxWidth={maxWidth}>
                {children}
            </Container>
        </SwipeableDrawer>
    );
};

BottomSheet.defaultProps = {
    maxWidth: "sm",
};

export default BottomSheet;
