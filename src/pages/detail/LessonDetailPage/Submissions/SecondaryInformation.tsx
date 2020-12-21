import React from "react";
import {Box} from "@material-ui/core";

export interface ISecondaryInformation {
    text: string;

    icon?: JSX.Element;
}

const informationProps = {
    display: "flex",
    alignItems: "center",
    style: {
        wordBreak: "break-all" as "break-all",
    },
};

const SecondaryInformation = ({icon, text}: ISecondaryInformation) => {
    return (
        <Box {...informationProps}>
            {icon}
            {text}
        </Box>
    );
};

export default SecondaryInformation;
