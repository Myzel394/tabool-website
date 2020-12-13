import React, {memo, useMemo} from "react";
import {Box, Grid, Typography, useTheme} from "@material-ui/core";
import {FaInfoCircle} from "react-icons/all";

export interface IInformation {
    text: string;
}

const Information = ({text}: IInformation) => {
    const theme = useTheme();
    const informationStyle = useMemo(() => ({
        backgroundColor: theme.palette.background.default,
        borderRadius: theme.shape.borderRadius,
    }), [theme.palette.background.default, theme.shape.borderRadius]);


    return (
        <Box p={2} style={informationStyle}>
            <Grid container spacing={2} direction="row" wrap="nowrap" alignItems="center">
                <Grid item>
                    <Typography variant="body1" color="textSecondary">
                        <FaInfoCircle />
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" color="textSecondary">
                        {text}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default memo(Information);
