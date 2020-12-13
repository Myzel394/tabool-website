import React, {memo, useMemo} from "react";
import {Box, Container, Typography, useTheme} from "@material-ui/core";
import {useAdaptedColor} from "hooks";
import tinycolor from "tinycolor2";

export interface ITitle {
    title: string;
    color: string;

    subTitle?: string;
}

const Title = ({title, color, subTitle}: ITitle) => {
    const theme = useTheme();
    const [backgroundColor, textColor] = useAdaptedColor(color);
    const divStyle = useMemo(() => ({
        backgroundColor,
    }), [backgroundColor]);
    const textStyle = useMemo(() => ({
        color: textColor,
    }), [textColor]);
    const subTitleStyle = useMemo(() => ({
        color: tinycolor(textColor).setAlpha(0.8).toString(),
    }), [textColor]);

    return (
        <Box py={5} style={divStyle}>
            <Container maxWidth="xs">
                <Typography
                    variant="h1"
                    component="h1"
                    style={textStyle}
                    align="center"
                >
                    {title}
                </Typography>
                {subTitle &&
                    <Typography
                        variant="h5"
                        component="h2"
                        align="center"
                        style={subTitleStyle}
                    >
                        {subTitle}
                    </Typography>
                }
            </Container>
        </Box>
    );
};

export default memo(Title);
