import React from "react";
import {makeStyles} from "@material-ui/core";


export interface SecondaryInformationProps {
    information: [string, any][];
}

const useClasses = makeStyles(theme => ({
    datalist: {
        margin: 0,
        display: "flex",
        flexDirection: "column",
        "& > div": {
            display: "flex",
            "& > dd": {
                marginLeft: theme.spacing(1),
            },
        },
    },
}));

const SecondaryInformation = ({
    information,
}: SecondaryInformationProps) => {
    const classes = useClasses();

    return (
        <dl className={classes.datalist}>
            {information.map(([label, value]) =>
                <div key={label}>
                    <dt>{label}: </dt>
                    <dd>{value}</dd>
                </div>)}
        </dl>
    );
};

export default SecondaryInformation;
