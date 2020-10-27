import React, {memo, useContext} from "react";
import {UserContext} from "contexts";
import {BottomNavigation as MuiBottomNavigation, BottomNavigationAction} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {FaTable, MdEventNote, MdHome} from "react-icons/all";



const BottomNavigation = () => {
    const {t} = useTranslation();
    const {state} = useContext(UserContext);

    if (state.isFullyRegistered) {
        return (
            <MuiBottomNavigation value="home">
                <BottomNavigationAction
                    label={t("Start").toString()}
                    icon={<MdHome />}
                    value="home"
                />
                <BottomNavigationAction
                    label={t("Stundenplan").toString()}
                    icon={<FaTable />}
                    value="timetable"
                />
                <BottomNavigationAction
                    label={t("Kalendar").toString()}
                    icon={<MdEventNote />}
                    value="calendar"
                />
            </MuiBottomNavigation>
        );
    }

    return null;
}

export default memo(BottomNavigation);
