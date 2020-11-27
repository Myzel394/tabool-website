import React, {memo, useMemo} from "react";
import {Box, Container, Typography} from "@material-ui/core";
import {useAdaptedColor} from "hooks";

export interface ITitle {
    title: string;
    color: string;
}

const Title = ({title, color}: ITitle) => {
    const [backgroundColor, textColor] = useAdaptedColor(color);
    const divStyle = useMemo(() => ({
        backgroundColor,
    }), [backgroundColor]);
    const textStyle = useMemo(() => ({
        color: textColor,
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
            </Container>
        </Box>
    );
};

export default memo(Title);
