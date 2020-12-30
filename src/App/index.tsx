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

import "./global.scss";

import {useElementSize} from "../hooks";

import Routes from "./Routes";
import Contexts from "./Contexts";
import BottomNavigation from "./BottomNavigation";


const App = () => {
    const theme = light;
    const $snackbar = useRef<any>();
    const $bottom = useRef<any>();
    const [, bottomHeight] = useElementSize($bottom);
    const snackbarStyles = useMemo(() => ({
        marginBottom: bottomHeight,
    }), [bottomHeight]);
    const closeSnackbar = (key) => $snackbar.current.closeSnackbar(key);

    return (
        <>
            <Router>
                <ThemeProvider theme={theme}>
                    <Contexts bottomSheetHeight={bottomHeight}>
                        <MuiPickersUtilsProvider utils={DayjsUtils}>
                            <SnackbarProvider
                                ref={$snackbar}
                                maxSnack={isMobile ? 2 : 5}
                                dense={isMobile}
                                style={snackbarStyles}
                                action={(key) =>
                                    <IconButton onClick={closeSnackbar.bind(null, key)}>
                                        <MdClose />
                                    </IconButton>
                                }
                            >
                                <CssBaseline />
                                <Routes />
                                <div
                                    style={{
                                        height: bottomHeight,
                                    }}
                                />
                                <BottomNavigation innerRef={$bottom} />
                            </SnackbarProvider>
                        </MuiPickersUtilsProvider>
                    </Contexts>
                </ThemeProvider>
            </Router>
        </>
    );
};

export default App;
