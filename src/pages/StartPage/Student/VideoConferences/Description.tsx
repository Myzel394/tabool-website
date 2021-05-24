import React from "react";
import {Dayjs} from "dayjs";
import {Box, Link, Typography} from "@material-ui/core";
import {buildPath, lazyDatetime} from "utils";
import {ButtonLike} from "components";


export interface DescriptionProps {
    date: Dayjs;
    secondaryText: string;
}

const style = {
    width: "100%",
    wordBreak: "break-word" as "break-word",
};

const Description = ({
    date,
    secondaryText,
}: DescriptionProps) => {
    return (
        <ButtonLike
            style={style}
            component={Link}
            justifyContent="flex-start"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            href={buildPath("/timetable", undefined, {
                date: lazyDatetime(date, "date"),
            })}
            underline="none"
        >
            <Box textAlign="left">
                <Typography variant="body1" color="textPrimary">
                    {date.format("LL")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {secondaryText}
                </Typography>
            </Box>
        </ButtonLike>
    );
};

export default Description;
