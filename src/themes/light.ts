import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";

const light = responsiveFontSizes(
    createMuiTheme({
        palette: {
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
                contrastText: "#222",
            },
            warning: {
                main: "#f2cc0c",
                contrastText: "#222",
            },
            info: {
                main: "#1fb0ff",
                contrastText: "#222",
            },
            success: {
                main: "#83db0f",
                contrastText: "#222",
            },
            text: {
                primary: "#222",
            },
            background: {
                default: "#f0f0f0",
                paper: "#fff",
            },
        },
        typography: {
            h1: {
                fontSize: "5.5rem",
                fontWeight: 200,
            },
        },
    }),
);

export default light;

