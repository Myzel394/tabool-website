import React, {memo} from "react";
import {Skeleton} from "@material-ui/lab";
import {Box, Grid, Typography} from "@material-ui/core";
import {useWindowSize} from "hooks";

const SkeletonContent = ({children, amount, spacing = 1}) => {
    return (
        <Box mx={2} mb={6}>
            <Typography variant="h4">
                <Skeleton variant="text" width="40%" />
            </Typography>
            <Box ml={4} mt={1}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <Grid container spacing={spacing} alignItems="flex-end" justify="flex-end">
                    {Array(amount).fill(children).map((child, index) =>
                        // eslint-disable-next-line react/no-array-index-key
                        <Grid key={index} item>
                            {child}
                        </Grid>)}
                </Grid>
            </Box>
        </Box>
    );
};

const Conferences = () => {
    const [width] = useWindowSize();
    const maxWidth = Math.min(300, width);

    const amount = Math.ceil(Math.random() * 3);

    return (
        <Grid container alignItems="center" direction="row" spacing={1}>
            {Array(amount).fill(null).map((x, index) =>
                // eslint-disable-next-line react/no-array-index-key
                <Grid key={`grid_skeleton_conferences_${index}`} item>
                    <Skeleton variant="circle" width={40} height={40} />
                </Grid>)}
            <Grid item>
                <Skeleton variant="rect" width={maxWidth * 0.9 - 44 * amount} />
            </Grid>
        </Grid>
    );
};

const SkeletonView = () => {
    const [width] = useWindowSize();
    const maxWidth = Math.min(300, width);

    return (
        <>
            <Box my={2}>
                <Box mb={4} mx={2}>
                    <Typography variant="h1">
                        <Skeleton variant="text" />
                    </Typography>
                </Box>
                <SkeletonContent amount={4}>
                    <Skeleton variant="rect" height={100} width={maxWidth} />
                </SkeletonContent>
                <SkeletonContent amount={4} spacing={3}>
                    <Conferences />
                </SkeletonContent>
            </Box>
        </>
    );
};

export default memo(SkeletonView);
