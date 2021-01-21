import React, {useMemo, useRef, useState} from "react";
import {CssBaseline, IconButton} from "@material-ui/core";
import "fontsource-roboto";
import {BrowserRouter as Router} from "react-router-dom";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import {SnackbarProvider} from "notistack";
import {isMobile} from "react-device-detect";
import {MdClose} from "react-icons/md";
import {useElementSize} from "hooks";

import "./global.scss";

import AppRoutes from "./AppRoutes";
import Contexts from "./Contexts";
import BottomNavigation from "./BottomNavigation";
import ErrorContextHandler from "./ErrorContextHandler";
import ThemeHandler from "./ThemeHandler";

const App = () => {
    const $snackbar = useRef<any>();
    const [bottomRef, setBottomRef] = useState();
    const [, bottomHeight] = useElementSize(bottomRef);
    const snackbarStyles = useMemo(() => ({
        marginBottom: bottomHeight,
    }), [bottomHeight]);
    const closeSnackbar = (key) => $snackbar.current.closeSnackbar(key);

    return (
        <Router>
            <Contexts bottomSheetHeight={bottomHeight}>
                <ThemeHandler>
                    <SnackbarProvider
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
                        <ErrorContextHandler>
                            <MuiPickersUtilsProvider utils={DayjsUtils}>
                                <CssBaseline />
                                <AppRoutes />
                            </MuiPickersUtilsProvider>
                        </ErrorContextHandler>
                        {/* Bottom padding */}
                        <div
                            style={{
                                height: bottomHeight,
                            }}
                        />
                        <BottomNavigation
                            innerRef={ref => {
                                if (ref) {
                                    setBottomRef(ref);
                                }
                            }}
                        />
                    </SnackbarProvider>
                </ThemeHandler>
            </Contexts>
        </Router>
    );
};

export default App;
