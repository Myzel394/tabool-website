import React from "react";
import {CssBaseline} from "@material-ui/core";
import "fontsource-roboto";
import {BrowserRouter as Router} from "react-router-dom";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import {Provider} from "react-redux";
import {persistor, store} from "state";
import {PersistGate} from "redux-persist/integration/react";
import {useTranslation} from "react-i18next";

import {LoadingPage} from "../components";

import AppRoutes from "./AppRoutes";
import Contexts from "./Contexts";
import ErrorContextHandler from "./ErrorContextHandler";
import ThemeHandler from "./ThemeHandler";
import SnackbarWrapper from "./SnackbarWrapper";

import "./global.scss";


const App = () => {
    const {t} = useTranslation();

    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingPage title={t("Einstellungen werden geladen...")} />} persistor={persistor}>
                <Router>
                    <Contexts>
                        <ThemeHandler>
                            <ErrorContextHandler>
                                <MuiPickersUtilsProvider utils={DayjsUtils}>
                                    <CssBaseline />
                                    <AppRoutes />
                                </MuiPickersUtilsProvider>
                            </ErrorContextHandler>
                        </ThemeHandler>
                    </Contexts>
                </Router>
            </PersistGate>
        </Provider>
    );
};

export default App;
