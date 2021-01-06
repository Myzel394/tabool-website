import React from "react";
import {ListItemIcon} from "@material-ui/core";
import {FaCheck} from "react-icons/all";
import {useColors} from "hooks";


const ActiveCheckIcon = () => {
    const {
        inputIconColor,
    } = useColors();

    return (
        <ListItemIcon>
            <FaCheck color={inputIconColor} />
        </ListItemIcon>
    );
};

export default ActiveCheckIcon;
