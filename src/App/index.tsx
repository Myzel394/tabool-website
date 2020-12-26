import React, {useMemo, useRef} from "react";
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import "fontsource-roboto";
import light from "themes/light";
import {BrowserRouter as Router} from "react-router-dom";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import {SnackbarProvider} from "notistack";
import {isMobile} from "react-device-detect";

import "./global.scss";

import {useElementSize} from "../hooks";

import Routes from "./Routes";
import Contexts from "./Contexts";
import BottomNavigation from "./BottomNavigation";


const App = () => {
    const theme = light;
    const $bottom = useRef<any>();
    const [bx, bottomHeight] = useElementSize($bottom);
    const snackbarStyles = useMemo(() => ({
        marginBottom: bottomHeight,
    }), [bottomHeight]);

    return (
        <>
            <Router>
                <ThemeProvider theme={theme}>
                    <Contexts bottomSheetHeight={bottomHeight}>
                        <MuiPickersUtilsProvider utils={DayjsUtils}>
                            <SnackbarProvider
                                maxSnack={isMobile ? 2 : 5}
                                style={snackbarStyles}
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
