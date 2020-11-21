import {IconButton} from "@material-ui/core";
import {MdViewDay, MdViewWeek} from "react-icons/all";
import React, {useContext} from "react";
import {View} from "react-big-calendar";

import CalendarContext from "../../../../CalendarContext";

const ViewChanger = () => {
    const {activeView, onViewChange: onChange} = useContext(CalendarContext);

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
            <IconButton
                color={getColor("work_week")}
                onClick={event => {
                    event.stopPropagation();
                    onChange("work_week");
                }}
            >
                <MdViewWeek />
            </IconButton>
        </>
    );
};

export default ViewChanger;
