import React from "react";
import {ThemeProvider, CssBaseline} from "@material-ui/core";
import "fontsource-roboto";
import light from "themes/light";
import {BrowserRouter as Router} from "react-router-dom";

import "./global.scss";
import Routes from "./Routes";

const App = () => {
    const theme = light;

    return (
        <>
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes />
                </ThemeProvider>
            </Router>
        </>
    );
};

export default App;
