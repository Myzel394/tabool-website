import React from "react";
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import "fontsource-roboto";
import light from "themes/light";
import {BrowserRouter as Router} from "react-router-dom";

import "./global.scss";
import Routes from "./Routes";
import Contexts from "./Contexts";

const App = () => {
    const theme = light;

    return (
        <>
            <Router>
                <ThemeProvider theme={theme}>
                    <Contexts>
                        <CssBaseline />
                        <Routes />
                    </Contexts>
                </ThemeProvider>
            </Router>
        </>
    );
};

export default App;
