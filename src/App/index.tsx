import React, {useMemo, useRef} from "react";
import {CssBaseline, IconButton, ThemeProvider} from "@material-ui/core";
import "fontsource-roboto";
import light from "themes/light";
import {BrowserRouter as Router} from "react-router-dom";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import {SnackbarProvider} from "notistack";
import {isMobile} from "react-device-detect";
import {MdClose} from "react-icons/md";
import {useElementSize, usePersistentStorage} from "hooks";
import dark from "themes/dark";

import "./global.scss";

import Routes from "./Routes";
import Contexts from "./Contexts";
import BottomNavigation from "./BottomNavigation";
import ErrorContextHandler from "./ErrorContextHandler";
import RequiredPermissions from "./RequiredPermissions";
import OhNoChecks from "./OhNoChecks";
import Checks from "./Checks";
import FCMHandler from "./FCMHandler";

const THEME_MAP = {
    light,
    dark,
};

const App = () => {
    const $snackbar = useRef<any>();
    const $bottom = useRef<any>();
    const [, bottomHeight] = useElementSize($bottom);
    const snackbarStyles = useMemo(() => ({
        marginBottom: bottomHeight,
    }), [bottomHeight]);
    const closeSnackbar = (key) => $snackbar.current.closeSnackbar(key);

    const [activeTheme, setActiveTheme] = usePersistentStorage<"light" | "dark">("light", "active_theme");

    return (
        <Router>
            <ThemeProvider theme={THEME_MAP[activeTheme]}>
                <Contexts bottomSheetHeight={bottomHeight} setActiveTheme={setActiveTheme} activeTheme={activeTheme}>
                    <Checks>
                        <OhNoChecks>
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
                                <FCMHandler>
                                    <RequiredPermissions>
                                        <ErrorContextHandler>
                                            <MuiPickersUtilsProvider utils={DayjsUtils}>
                                                <CssBaseline />
                                                <Routes />
                                            </MuiPickersUtilsProvider>
                                        </ErrorContextHandler>
                                        {/* Bottom padding */}
                                        <div
                                            style={{
                                                height: bottomHeight,
                                            }}
                                        />
                                        <BottomNavigation innerRef={$bottom} />
                                    </RequiredPermissions>
                                </FCMHandler>
                            </SnackbarProvider>
                        </OhNoChecks>
                    </Checks>
                </Contexts>
            </ThemeProvider>
        </Router>
    );
};

export default App;
