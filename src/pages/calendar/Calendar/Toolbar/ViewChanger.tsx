import {IconButton} from "@material-ui/core";
import {MdViewDay, MdViewWeek} from "react-icons/all";
import React, {useCallback} from "react";
import {View} from "react-big-calendar";

export interface IViewChanger {
    activeView: View;
    onChange: (newView: View) => any;
};

const ViewChanger = ({ activeView, onChange }: IViewChanger) => {
    const getColor = useCallback((targetedView: View) =>
            (activeView === targetedView ? "primary" : "default"),
        [activeView]);

    return (
        <>
            <IconButton
                color={getColor("day")}
                onClick={onChange.bind(null, "day")}
            >
                <MdViewDay />
            </IconButton>
            <IconButton
                color={getColor("work_week")}
                onClick={onChange.bind(null, "work_week")}
            >
                <MdViewWeek />
            </IconButton>
        </>
    );
}

export default ViewChanger;
