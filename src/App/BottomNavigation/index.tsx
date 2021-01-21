import React, {memo, useContext, useMemo} from "react";
import {UserContext} from "contexts";
import {BottomNavigation as MuiBottomNavigation, BottomNavigationAction, useTheme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {FaTable, MdEventNote, MdHome, MdSettings} from "react-icons/all";
import {useLocation} from "react-router";

import {buildPath} from "../../utils";

import styles from "./BottomNavigation.module.scss";


const BottomNavigation = ({innerRef}) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const {state} = useContext(UserContext);
    const location = useLocation();
    const baseLocation = `/${location.pathname.split("/")[2]}`;

    const style = useMemo(() => ({
        zIndex: theme.zIndex.appBar - 1,
    }), [theme.zIndex.appBar]);

    if (state.isFullyRegistered) {
        return (
            <MuiBottomNavigation ref={innerRef} style={style} value={baseLocation} className={styles.container}>
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
            </MuiBottomNavigation>
        );
    }

    return null;
};

export default memo(BottomNavigation);
