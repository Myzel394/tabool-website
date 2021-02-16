import React, {memo} from "react";
import {List, Paper} from "@material-ui/core";

import Statistics from "./Statistics";


const DataShare = () => {
    return (
        <Paper>
            <List>
                <Statistics />
            </List>
        </Paper>
    );
};
export default memo(DataShare);


