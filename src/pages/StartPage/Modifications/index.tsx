import React, {memo, useContext} from "react";
import {Box, Typography} from "@material-ui/core";

import StartPageContext from "../StartPageContext";

import SingleModification from "./SingleModification";


const Modifications = () => {
    const {
        dailyData: {
            modifications,
        },
    } = useContext(StartPageContext);

    return (
        <>
            {modifications.map(modification =>
                (modification.lesson) &&
                    <div key={modification.id}>
                        <Box mb={1}>
                            <Typography variant="h6">
                                {modification.startDatetime.format("lll")}
                            </Typography>
                        </Box>
                        <SingleModification modification={modification} />
                    </div>)}
        </>
    );
};

export default memo(Modifications);
