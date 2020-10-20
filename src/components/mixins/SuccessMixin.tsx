import React, {ReactElement, useMemo} from "react";
import {MdCheckCircle} from "react-icons/all";
import {Typography, useTheme} from "@material-ui/core";

export interface ISucessMixin {
    title: string;
    description: string;
    children?: ReactElement;
}

const SuccessMixin = ({title, description, children}: ISucessMixin) => {
    const theme = useTheme();
    const circleProps = useMemo(() => ({
        color: theme.palette.success.main,
        style: {
            height: 150,
            width: "100%",
        },
    }), [theme]);

    return (
        <>
            <MdCheckCircle {...circleProps} />
            <Typography variant="h3" align="center">{title}</Typography>
            <Typography color="textPrimary">{description}</Typography>
            {children}
        </>
    );
};

export default SuccessMixin;
