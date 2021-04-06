import React, {memo} from "react";
import {Box, Button, Grid, Typography} from "@material-ui/core";
import {ReactSVG} from "react-svg";
import {useTranslation} from "react-i18next";
import {FocusedPage} from "components";

export interface IRequestPermission {
    title: string;
    description: string;
    svgLocation: string;
    onGrant: () => any;

    onDismiss?: () => any;
}

const RequestPermission = ({
    description,
    svgLocation,
    onDismiss,
    onGrant,
    title,
}: IRequestPermission) => {
    const {t} = useTranslation();

    return (
        <FocusedPage disableBackButton title={title}>
            <Grid container spacing={4} justify="center" alignItems="center">
                <Grid item>
                    <Box my={2}>
                        <ReactSVG
                            src={svgLocation}
                            beforeInjection={(svg) =>
                                svg.setAttribute("style", "margin:0 auto;max-height: 200px;max-width:100%")
                            }
                        />
                    </Box>
                </Grid>
                <Grid item>
                    <Typography variant="body1">
                        {description}
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="column" spacing={1} justify="center" alignItems="center">
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={onGrant}>
                                {t("Zugriff erteilen")}
                            </Button>
                        </Grid>
                        {onDismiss && (
                            <Grid item xs={12}>
                                <Button variant="text" color="default" onClick={onDismiss}>
                                    {t("Nicht erteilen")}
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </FocusedPage>
    );
};

export default memo(RequestPermission);
