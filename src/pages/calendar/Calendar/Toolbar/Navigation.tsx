import {Tooltip} from "components";
import {Button, IconButton} from "@material-ui/core";
import {navigate as navigationConstants} from "react-big-calendar/lib/utils/constants";
import {FaCaretLeft, FaCaretRight} from "react-icons/all";
import React from "react";
import {useTranslation} from "react-i18next";
import {NavigateAction} from "react-big-calendar";

export interface INavigation {
    onNavigate: (newNavigation: NavigateAction) => any;
    label: string;
}

const Navigation = ({onNavigate, label}: INavigation) => {
    const {t} = useTranslation();

    return (
        <>
            <Tooltip title={t("Zurück").toString()}>
                <IconButton onClick={() => onNavigate(navigationConstants.PREVIOUS)}>
                    <FaCaretLeft />
                </IconButton>
            </Tooltip>
            <Tooltip title={t("Heute").toString()}>
                <Button color="default" onClick={() => onNavigate(navigationConstants.TODAY)}>
                    {label}
                </Button>
            </Tooltip>
            <Tooltip title={t("Weiter").toString()}>
                <IconButton onClick={() => onNavigate(navigationConstants.NEXT)}>
                    <FaCaretRight />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default Navigation;
