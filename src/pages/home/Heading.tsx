import React, {memo, useMemo} from "react";
import {Box, Typography, TypographyProps, useTheme} from "@material-ui/core";

import styles from "./Heading.module.scss";

export interface IHeading extends Omit<TypographyProps, "color">{
    title: string;
    color?: string;
}

const Heading = (props: IHeading) => {
    const theme = useTheme();
    const {
        title,
        color = theme.palette.text.primary,
        ...other
    } = props;
    const style: any = useMemo(() => ({
        color,
    }), [color]);

    return (
        <Box mb={2}>
            <Typography
                style={style}
                variant="h2"
                align="center"
                className={styles.text}
                {...other}
            >
                {title}
            </Typography>
        </Box>
    );
};

export default memo(Heading);
