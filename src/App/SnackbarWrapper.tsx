import React, {ReactNode, useCallback, useContext, useMemo, useRef} from "react";
import {isMobile} from "react-device-detect";
import {IconButton} from "@material-ui/core";
import {MdClose} from "react-icons/md";
import {SnackbarKey, SnackbarProvider} from "notistack";

import {UtilsContext} from "../contexts";


export interface ISnackbarProvider {
    children: ReactNode;
}

const SnackbarWrapper = ({
    children,
}: ISnackbarProvider) => {
    const {
        bottomSheetHeight,
    } = useContext(UtilsContext);

    const $snackbar = useRef<any>();

    const snackbarStyles = useMemo(() => ({
        marginBottom: bottomSheetHeight,
    }), [bottomSheetHeight]);
    const closeSnackbar = useCallback(
        (key: SnackbarKey) => $snackbar.current.closeSnackbar(key),
        [],
    );

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
        </>
    );
};
export default SnackbarWrapper;


