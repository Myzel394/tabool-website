import {Theme} from "@material-ui/core";
import update from "immutability-helper";

const createSmallTheme = (parentTheme: Theme) => update(parentTheme, {
    typography: {
        body1: {
            fontSize: {
                $set: ".5rem",
            },
            [parentTheme.breakpoints.up("lg")]: {
                $set: {
                    fontSize: ".8rem",
                },
            },
        },
        body2: {
            fontSize: {
                $set: ".4rem",
            },
            [parentTheme.breakpoints.up("lg")]: {
                $set: {
                    fontSize: ".7rem",
                },
            },
        },
        h5: {
            $apply: data => {
                const {fontFamily, fontWeight, letterSpacing, lineHeight} = data;

                return {
                    fontFamily,
                    fontWeight,
                    letterSpacing,
                    lineHeight,
                    fontSize: ".7rem",
                    [parentTheme.breakpoints.up("lg")]: {
                        fontSize: "1.3rem",
                    },
                };
            },
        },
    },
});

export default createSmallTheme;
