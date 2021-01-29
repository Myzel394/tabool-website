import React from "react";
import {useQuery} from "react-query";
import {IFetchCourseListData, IFetchCourseListResponse, useFetchCourseListAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {useQueryOptions} from "hooks";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {DefaultPage, LoadingPage, stickyHeaderStyles} from "components";
import {Box, CircularProgress, Divider, List, Paper, Typography} from "@material-ui/core";

import CourseMaterials from "./CourseMaterials";


const FileList = () => {
    const classes = stickyHeaderStyles();
    const {t} = useTranslation();
    const fetchCourses = useFetchCourseListAPI();
    const queryOptions = useQueryOptions();

    const {
        data,
        isError,
        isFetching,
    } = useQuery<IFetchCourseListResponse, AxiosError, IFetchCourseListData>(
        "fetch_courses",
        () => fetchCourses(),
        queryOptions,
    );

    if (!data) {
        if (isFetching) {
            return (
                <LoadingPage title={t("Dateien werden geladen")} />
            );
        }

        return (
            <Alert severity="error">
                {t("Materialien konnten nicht geladen werden.")}
            </Alert>
        );
    }

    return (
        <DefaultPage>
            <Box component={Paper} p={2}>
                <Typography variant="h4">
                    {t("Materialien in deinen Fächern")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {t("Klicke auf den Fachnamen, um alle Materialien zu sehen")}
                </Typography>
                {/* Status */}
                <Box my={2} display="flex" alignItems="center" justifyContent="center">
                    {isFetching && <CircularProgress />}
                    {isError && (
                        <Alert severity="error">
                            {t("Es konnten keine Materialien mehr geladen werden.")}
                        </Alert>
                    )}
                </Box>
                <List className={classes.root} subheader={<li />}>
                    {data.results.map((course, index) =>
                        <>
                            <Box key={course.id} component="li">
                                <CourseMaterials course={course} />
                            </Box>
                            {(index < Object.keys(data.results).length - 1) && (
                                <Box my={2}>
                                    <Divider />
                                </Box>
                            )}
                        </>)}
                </List>
            </Box>
        </DefaultPage>
    );
};
export default FileList;

