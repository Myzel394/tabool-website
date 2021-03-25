import React, {ReactNode, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState} from "react";
import {isMobile} from "react-device-detect";
import {IconButton} from "@material-ui/core";
import {MdClose} from "react-icons/md";
import {useElementSize} from "hooks";
import {SnackbarKey, SnackbarProvider} from "notistack";

import {UtilsContext} from "../contexts";

import BottomNavigation from "./BottomNavigation";


export interface ISnackbarProvider {
    children: ReactNode;
}

const SnackbarWrapper = ({
    children,
}: ISnackbarProvider) => {
    const {
        bottomSheetHeight,
        _updateBottomSheetHeight,
    } = useContext(UtilsContext);

    const [$bottom, $setBottom] = useState<HTMLDivElement | null>();
    const $snackbar = useRef<any>();

    const [, elementHeight = 0] = useElementSize($bottom);
    const bottomHeight = $bottom ? elementHeight : 0;
    const snackbarStyles = useMemo(() => ({
        marginBottom: bottomHeight,
    }), [bottomHeight]);
    const closeSnackbar = useCallback(
        (key: SnackbarKey) => $snackbar.current.closeSnackbar(key),
        [],
    );

    useLayoutEffect(() => {
        if (bottomHeight !== undefined && bottomHeight !== bottomSheetHeight) {
            _updateBottomSheetHeight(bottomHeight);
        }
    }, [bottomHeight, bottomSheetHeight, _updateBottomSheetHeight]);

    return (
        <>
            <SnackbarProvider
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ref={$snackbar}
                maxSnack={isMobile ? 2 : 5}
                dense={isMobile}
                style={snackbarStyles}
                action={(key) =>
                    <IconButton onClick={() => closeSnackbar(key)}>
                        <MdClose />
                    </IconButton>
                }
            >
                {children}
            </SnackbarProvider>

            {/* Bottom padding */}
            <div
                style={{
                    height: bottomHeight,
                }}
            />
            <BottomNavigation
                innerRef={$setBottom}
            />
        </>
    );
};
export default SnackbarWrapper;


