import React, {useMemo} from "react";
import {FaArrowUp} from "react-icons/all";
import {Box, Typography, useTheme} from "@material-ui/core";
import {useTranslation} from "react-i18next";


const style = {
    backgroundColor: "rgba(0, 0, 0, .7)",
    position: "fixed" as "fixed",
    width: "100vw",
    height: "100vh",
    left: 0,
    top: 0,
};
const arrowStyle = {
    position: "fixed" as "fixed",
    left: 340,
    top: 150,
};

const PressOnAllow = ({children, show}) => {
    const theme = useTheme();
    const {t} = useTranslation();

    const wrapperStyle = useMemo(() => ({
        ...style,
        zIndex: theme.zIndex.modal - 1,
    }), [theme.zIndex.modal]);

    return (
        <>
            {children}
            {show &&
                <div style={wrapperStyle}>
                    <Box display="flex" alignItems="flex-start" flexDirection="column" style={arrowStyle}>
                        <FaArrowUp size="5rem" color={theme.palette.primary.main} />
                        <Typography variant="h4" color="primary">
                            {t("Erteile die Berechtigung")}
                        </Typography>
                    </Box>
                </div>}
        </>
    );
};

export default PressOnAllow;
