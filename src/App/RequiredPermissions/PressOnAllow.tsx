import React, {useMemo} from "react";
import {Backdrop, Box, Typography, useTheme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {FaArrowUp} from "react-icons/all";

const PressOnAllow = ({children, show}) => {
    const theme = useTheme();
    const {t} = useTranslation();

    const style = useMemo(() => ({
        zIndex: theme.zIndex.modal + 1,
    }), [theme.zIndex.modal]);

    return (
        <>
            <Backdrop open={show} style={style}>
                <Box display="flex" alignItems="center" flexDirection="column">
                    <FaArrowUp size="5rem" color={theme.palette.primary.main} />
                    <Typography variant="h4" color="primary">
                        {t("Erteile die Berechtigung")}
                    </Typography>
                </Box>
            </Backdrop>
            {children}
        </>
    );
};

export default PressOnAllow;
