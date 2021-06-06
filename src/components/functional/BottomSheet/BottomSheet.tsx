import React, {useMemo} from "react";
import {Box, Container, ContainerProps, SwipeableDrawer, SwipeableDrawerProps, useTheme} from "@material-ui/core";
import {isIOS} from "react-device-detect";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";

export interface IBottomSheet extends Omit<SwipeableDrawerProps,
    "disableSwipeToOpen" |
    "disableBackdropTransition" |
    "disableDiscovery" |
    "open" |
    "children" |
    "anchor" |
    "onOpen" |
    "onClose"> {
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
    PaperProps,
    style: givenStyle,
    variant,
    ...other
}: IBottomSheet) => {
    const theme = useTheme();
    const style = useMemo(() => ({
        ...givenStyle,
        borderRadius: theme.shape.borderRadius,
    }), [theme.shape.borderRadius, givenStyle]);
    const isTemporary = variant === "temporary";

    return (
        <SwipeableDrawer
            {...other}
            disableSwipeToOpen
            variant={variant}
            anchor="bottom"
            open={isOpen}
            disableBackdropTransition={!isIOS}
            disableDiscovery={isIOS}
            style={wrapperStyle}
            PaperProps={{
                ...PaperProps,
                style: wrapperStyle,
            }}
            onClose={onClose ?? (() => null)}
            onOpen={() => null}
        >
            <Container maxWidth={maxWidth}>
                {isTemporary && (
                    <Box pt={1} display="flex" alignItems="center" justifyContent="center">
                        <div
                            style={{
                                width: 100,
                                height: 8,
                                borderRadius: theme.shape.borderRadius,
                                backgroundColor: theme.palette.background.default,
                            }}
                        />
                    </Box>
                )}
                <Box p={2} pt={isTemporary ? 2 : 3} style={style}>
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
