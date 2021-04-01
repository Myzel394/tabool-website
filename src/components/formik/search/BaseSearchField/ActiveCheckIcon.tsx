import React from "react";
import {FaCheck} from "react-icons/all";
import {useColors} from "hooks";


const ActiveCheckIcon = () => {
    const {
        inputIconColor,
    } = useColors();

    return (
        <FaCheck color={inputIconColor} />
    );
};

export default ActiveCheckIcon;
