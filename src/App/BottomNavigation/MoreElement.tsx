import React from "react";
import {IconType} from "react-icons/lib";
import {Box, Link, Typography, useTheme} from "@material-ui/core";
import {ButtonLike} from "components";

export interface IMoreElement {
    text: string;
    href: string;
    icon: IconType;
}

const MoreElement = ({
    text,
    href,
    icon: Icon,
}: IMoreElement) => {
    const theme = useTheme();

    return (
        <ButtonLike
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            color="textPrimary"
            flexBasis="50%"
            style={{
                // Add padding to child
                padding: 0,
            }}
        >
            <Link
                underline="none"
                color="textPrimary"
                href={href}
                style={{
                    width: "100%",
                    padding: theme.spacing(1),
                }}
            >
                <Box mb={2}>
                    <Icon size="1.5rem" color="inherit" />
                </Box>
                <Typography variant="body2" color="textPrimary">
                    {text}
                </Typography>
            </Link>
        </ButtonLike>
    );
};
export default MoreElement;


