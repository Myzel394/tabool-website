import React, {memo, useContext, useState} from "react";
import {UserContext, UtilsContext} from "contexts";
import {BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Box, makeStyles} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {FaFile, FaPenNib, FaTable, MdEventNote, MdHome, MdMoreVert, MdSettings} from "react-icons/all";
import {useLocation} from "react-router";
import {buildPath} from "utils";
import {BottomSheet} from "components";

import MoreElement from "./MoreElement";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: `!important` not supported
const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.appBar - 1,
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
    },
    sheet: {
        zIndex: `${theme.zIndex.appBar - 2} !important`,
        "& .MuiPaper-root": {
            zIndex: theme.zIndex.appBar - 2,
        },
    },
}));

const BottomNavigation = ({innerRef}) => {
    const classes = useStyles();
    const {t} = useTranslation();
    const {state} = useContext(UserContext);
    const {bottomSheetHeight} = useContext(UtilsContext);
    const location = useLocation();
    const baseLocation = `/${location.pathname.split("/")[2]}`;

    const [isOptionsOpened, setIsOptionsOpened] = useState<boolean>(false);

    if (state.isFullyRegistered) {
        return (
            <>
                <MuiBottomNavigation
                    ref={innerRef}
                    value={baseLocation}
                    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                    // @ts-ignore
                    className={classes.appBar}
                >
                    <BottomNavigationAction
                        label={t("Start").toString()}
                        icon={<MdHome />}
                        value="/"
                        href={buildPath("/")}
                    />
                    <BottomNavigationAction
                        label={t("Stundenplan").toString()}
                        icon={<FaTable />}
                        value="/timetable"
                        href={buildPath("/timetable/")}
                    />
                    <BottomNavigationAction
                        label={t("Agenda").toString()}
                        icon={<MdEventNote />}
                        value="/agenda"
                        href={buildPath("/agenda/")}
                    />
                    <BottomNavigationAction
                        label={t("Einstellungen").toString()}
                        icon={<MdSettings />}
                        value="/settings"
                        href={buildPath("/settings/")}
                    />
                    <BottomNavigationAction
                        label={t("Mehr").toString()}
                        icon={<MdMoreVert />}
                        onClick={() => setIsOptionsOpened(prevState => !prevState)}
                    />
                </MuiBottomNavigation>
                <BottomSheet
                    isOpen={isOptionsOpened}
                    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                    // @ts-ignore
                    className={classes.sheet}
                    // Rerendering isn't bad - it's an easy-to.render component
                    style={{
                        marginBottom: bottomSheetHeight,
                    }}
                    onClose={() => setIsOptionsOpened(false)}
                >
                    <Box
                        m={2}
                        alignItems="center"
                        justifyContent="center"
                        display="flex"
                    >
                        <MoreElement
                            text={t("Entschuldigungsliste")}
                            href={buildPath("/agenda/absence/")}
                            icon={FaPenNib}
                        />
                        <MoreElement
                            text={t("Dateien")}
                            href={buildPath("/agenda/files/")}
                            icon={FaFile}
                        />
                    </Box>
                </BottomSheet>
            </>
        );
    }

    return null;
};

export default memo(BottomNavigation);
