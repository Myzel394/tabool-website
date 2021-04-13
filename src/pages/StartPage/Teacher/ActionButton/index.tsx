import React, {MutableRefObject, useContext, useState} from "react";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {FaVideo, MdCheckBox} from "react-icons/all";
import {Backdrop, makeStyles} from "@material-ui/core";

import useSpeedDialStyle from "../../useSpeedDialStyle";
import StartPageContext from "../StartPageContext";

import {ActionHandler, AvailableActions} from "./Actions";

export interface IActionButton {
    scrollPositionRef: MutableRefObject<number>;
}

const useClasses = makeStyles(theme => ({
    backdrop: {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: theme.zIndex.speedDial - 1,
    },
}));

const getScrollPosition = (): number =>
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

const ActionButton = ({
    scrollPositionRef,
}: IActionButton) => {
    const {
        requestLesson: parentRequestLesson,
    } = useContext(StartPageContext);
    const {t} = useTranslation();
    const classes = useClasses();
    const speedDialStyle = useSpeedDialStyle();

    const [action, setAction] = useState<AvailableActions | null>(null);
    const [isSpeedDialOpen, setIsSpeedDialOpen] = useState<boolean>(false);

    const requestLesson = () => {
        scrollPositionRef.current = getScrollPosition();

        setIsSpeedDialOpen(false);
        return parentRequestLesson();
    };

    return (
        <>
            <Backdrop open={isSpeedDialOpen} className={classes.backdrop} />
            <SpeedDial
                ariaLabel={t("SpeedDial")}
                open={isSpeedDialOpen}
                style={speedDialStyle}
                icon={<SpeedDialIcon />}
                onOpen={() => setIsSpeedDialOpen(true)}
                onClose={() => setIsSpeedDialOpen(false)}
            >
                <SpeedDialAction
                    tooltipOpen
                    tooltipTitle={t("Videokonferenz hinzufügen").toString()}
                    icon={<FaVideo />}
                    onClick={() => requestLesson().then(() => setAction("addVideoConference"))}
                />
                <SpeedDialAction
                    tooltipOpen
                    tooltipTitle={t("Materialien verwalten").toString()}
                    icon={<MdCheckBox />}
                    onClick={() => requestLesson().then(() => setAction("manageMaterials"))}
                />
            </SpeedDial>
            <ActionHandler action={action} onActionUpdate={setAction} />
        </>
    );
};

export default ActionButton;
