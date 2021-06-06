import React from "react";
import {Box} from "@material-ui/core";

export interface SecondaryInformationProps {
    text: string;

    icon?: JSX.Element;
}

const informationProps = {
    display: "flex",
    alignItems: "center",
    style: {
        wordBreak: "break-word" as "break-word",
    },
};

const SecondaryInformation = ({icon, text}: SecondaryInformationProps) => {
    return (
        <Box {...informationProps}>
            <Box mr={1}>
                {icon}
            </Box>
            {text}
        </Box>
    );
};

export default SecondaryInformation;
