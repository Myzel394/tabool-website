import React, {ReactNode} from "react";
import {Box} from "@material-ui/core";

export interface IBadges {
    children: ReactNode;
}

const Badges = ({children}: IBadges) => {
    return (
        <Box flexDirection="row">
            {children}
        </Box>
    );
}

export default Badges;
