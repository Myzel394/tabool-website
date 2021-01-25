import React from "react";
import {Absence as AbsenceType} from "types";
import {Box, ListSubheader, makeStyles} from "@material-ui/core";
import dayjs, {Dayjs} from "dayjs";

import Absence from "./Absence";


export interface IDateList {
    absences: AbsenceType[];
    isFirst: boolean;
    date: Dayjs;
    onUpdate: (oldAbsenceId: string, newAbsence: AbsenceType) => any;
}

const useStyles = makeStyles(({
    ul: {
        padding: 0,
        backgroundColor: "inherit",
        "& li": {
            listStyle: "none",
        },
    },
    listSection: {
        backgroundColor: "inherit",
    },
}));


const DateList = ({
    absences,
    isFirst,
    date,
    onUpdate,
}: IDateList) => {
    const classes = useStyles();


    return (
        <Box component="li" mt={5 * Number(isFirst)} className={classes.listSection}>
            <ul className={classes.ul}>
                <ListSubheader>
                    {dayjs(date).format("ll")}
                </ListSubheader>
                {absences.map(absence =>
                    <Absence
                        {...absence}
                        key={absence.id}
                        onUpdate={newAbsence => onUpdate(absence.id, newAbsence)}
                    />)}
            </ul>
        </Box>
    );
};
export default DateList;


