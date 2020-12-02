import React, {useRef} from "react";
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import "fontsource-roboto";
import light from "themes/light";
import {BrowserRouter as Router} from "react-router-dom";

import "./global.scss";

import {useElementSize} from "../hooks";

import Routes from "./Routes";
import Contexts from "./Contexts";
import BottomNavigation from "./BottomNavigation";


const App = () => {
    const theme = light;
    const $bottom = useRef<any>();
    const [bx, bottomHeight] = useElementSize($bottom);

    return (
        <>
            <Router>
                <ThemeProvider theme={theme}>
                    <Contexts bottomSheetHeight={bottomHeight}>
                        <CssBaseline />
                        <Routes />
                        <BottomNavigation innerRef={$bottom} />
                    </Contexts>
                </ThemeProvider>
            </Router>
        </>
    );
};

export default App;
