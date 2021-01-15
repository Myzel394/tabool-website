import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import {deDE} from "@material-ui/core/locale";

const dark = responsiveFontSizes(
    createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#FFA723",
                contrastText: "#fff",
            },
            secondary: {
                main: "#D91A1A",
                contrastText: "#fff",
            },
            error: {
                main: "#eb3215",
                contrastText: "#fff",
            },
            warning: {
                main: "#f2cc0c",
                contrastText: "rgba(0, 0, 0, 0.87)",
            },
            info: {
                main: "#1fb0ff",
                contrastText: "rgba(0,0,0,0.87)",
            },
            success: {
                main: "#83db0f",
                contrastText: "rgba(0, 0, 0, 0.87)",
            },
            background: {
                default: "#121212",
                paper: "#1e1e1e",
            },
        },
        typography: {
            h1: {
                fontSize: "5.5rem",
                fontWeight: 200,
            },
        },
    }, deDE),
);

export default dark;

