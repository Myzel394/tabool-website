import {makeStyles} from "@material-ui/core";

const stickyHeaderStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        "& > li": {
            backgroundColor: "inherit",
            "& > ul": {
                padding: 0,
                backgroundColor: "inherit",
                "& li": {
                    listStyle: "none",
                },
            },
        },
    },
}));

export default stickyHeaderStyles;
