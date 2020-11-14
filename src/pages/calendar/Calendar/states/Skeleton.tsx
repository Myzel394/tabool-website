import React, {memo} from "react";
import {Box, Container, Typography} from "@material-ui/core";
import {Skeleton as MUISkeleton} from "@material-ui/lab";
import {isMobile} from "react-device-detect";
import {useTranslation} from "react-i18next";

const WIDTH = isMobile ? 100 : 250;
const HEIGHT = isMobile ? 80 : 150;
const AMOUNT = isMobile ? 6 : 12;

const Skeleton = () => {
    const {t} = useTranslation();
    const keys = Array.from({length: AMOUNT}, (x, index) => `skeleton_calendar_${index}`);

    return (
        <>
            <Container maxWidth="sm">
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={1}
                >
                    <MUISkeleton variant="rect" width="70%" height={60} />
                    <MUISkeleton variant="rect" width="20%" height={60} />
                </Box>
            </Container>
            <Box
                my={5}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="space-between"
                >
                    {keys.map(key => {
                        return (
                            <Box key={key} m={1}>
                                <MUISkeleton variant="rect" width={WIDTH} height={HEIGHT} />
                            </Box>
                        );
                    })}
                </Box>
                <Typography color="textSecondary" align="center" variant="h4">
                    {t("Stundenplan laden...")}
                </Typography>
            </Box>
        </>
    );
};

export default memo(Skeleton);
