import React, {memo, useContext, useEffect, useMemo, useState} from "react";
import {UserContext} from "contexts";
import {BottomNavigation as MuiBottomNavigation, BottomNavigationAction, useTheme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {FaTable, MdEventNote, MdHome, MdSettings} from "react-icons/all";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

import styles from "./BottomNavigation.module.scss";


const BottomNavigation = ({innerRef}) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const {state} = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();
    const baseLocation = `/${location.pathname.split("/")[2]}`;

    const [selectedValue, setSelectedValue] = useState<string>(baseLocation);

    const style = useMemo(() => ({
        zIndex: theme.zIndex.appBar - 1,
    }), [theme.zIndex.appBar]);

    useEffect(() => {
        if (selectedValue !== baseLocation) {
            history.push(`/app${selectedValue}`);
        }
    }, [selectedValue, baseLocation, history]);

    if (state.isFullyRegistered) {
        return (
            <MuiBottomNavigation ref={innerRef} style={style} value={selectedValue} className={styles.container}>
                <BottomNavigationAction
                    label={t("Start").toString()}
                    icon={<MdHome />}
                    value="/"
                    onClick={() => setSelectedValue("/")}
                />
                <BottomNavigationAction
                    label={t("Stundenplan").toString()}
                    icon={<FaTable />}
                    value="/timetable"
                    onClick={() => setSelectedValue("/timetable")}
                />
                <BottomNavigationAction
                    label={t("Agenda").toString()}
                    icon={<MdEventNote />}
                    value="/agenda"
                    onClick={() => setSelectedValue("/agenda")}
                />
                <BottomNavigationAction
                    label={t("Einstellungen").toString()}
                    icon={<MdSettings />}
                    value="/settings"
                    onClick={() => setSelectedValue("/settings")}
                />
            </MuiBottomNavigation>
        );
    }

    return null;
};

export default memo(BottomNavigation);
