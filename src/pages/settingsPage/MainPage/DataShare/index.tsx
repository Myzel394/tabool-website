import React, {memo} from "react";
import {List, Paper} from "@material-ui/core";

import Statistics from "./Statistics";
import LoadScoosoData from "./LoadScoosoData";


const DataShare = () => {
    return (
        <Paper>
            <List>
                <Statistics />
                <LoadScoosoData />
            </List>
        </Paper>
    );
};
export default memo(DataShare);


