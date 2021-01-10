import React from "react";
import {Dayjs} from "dayjs";
import {Box, Link, Typography} from "@material-ui/core";
import {buildPath, lazyDatetime} from "utils";
import {ButtonLike} from "components";


export interface IDescription {
    date: Dayjs;
    secondaryText: string;
}

const wrapStyle = {
    wordBreak: "break-word" as "break-word",
};

const Description = ({
    date,
    secondaryText,
}: IDescription) => {
    return (
        <ButtonLike>
            <Link
                href={buildPath("/timetable", undefined, {
                    date: lazyDatetime(date, "date"),
                })}
                underline="none"
            >
                <Box textAlign="left">
                    <Typography variant="body1" color="textPrimary">
                        {date.format("LL")}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={wrapStyle}>
                        {secondaryText}
                    </Typography>
                </Box>
            </Link>
        </ButtonLike>
    );
};

export default Description;
