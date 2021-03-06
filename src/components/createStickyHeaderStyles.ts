import {makeStyles} from "@material-ui/core";

const getLiItem = (backgroundColor: string) => ({
    backgroundColor,
    "& > ul": {
        padding: 0,
        backgroundColor: "inherit",
        "& li": {
            listStyle: "none",
        },
    },
});

const createStickyHeaderStyles = (background?: string) => makeStyles(theme => {
    const backgroundColor = background ?? theme.palette.background.paper;
    const liItemObject = getLiItem(backgroundColor);

    return {
        root: {
            backgroundColor,
            width: "100%",
            "& > li": liItemObject,
        },
        liItem: liItemObject,
    };
})();

export default createStickyHeaderStyles;
