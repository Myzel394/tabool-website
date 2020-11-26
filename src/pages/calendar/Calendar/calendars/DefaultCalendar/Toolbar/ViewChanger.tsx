import {IconButton} from "@material-ui/core";
import {MdViewDay, MdViewWeek} from "react-icons/all";
import React, {useContext} from "react";
import {View} from "react-big-calendar";
import {useDeviceWidth} from "hooks";
import {Tooltip} from "components";
import {useTranslation} from "react-i18next";

import CalendarContext from "../../../../CalendarContext";

const ViewChanger = () => {
    const {t} = useTranslation();
    const {activeView, onViewChange: onChange, calendarType} = useContext(CalendarContext);
    const {isMD} = useDeviceWidth();
    const weekDisabled = !isMD && calendarType === "homework";

    const getColor = (targetedView: View) =>
        (activeView === targetedView ? "primary" : "default");

    return (
        <>
            <IconButton
                color={getColor("day")}
                onClick={event => {
                    event.stopPropagation();
                    onChange("day");
                }}
            >
                <MdViewDay />
            </IconButton>
            <Tooltip title={weekDisabled && t("Die Wochen-Anzeige ist bei der Hausaufgabenplan-Ansicht deaktiviert.").toString()}>
                <span>
                    <IconButton
                        color={getColor("work_week")}
                        disabled={weekDisabled}
                        onClick={event => {
                            event.stopPropagation();
                            onChange("work_week");
                        }}
                    >
                        <MdViewWeek />
                    </IconButton>
                </span>
            </Tooltip>
        </>
    );
};

export default ViewChanger;
