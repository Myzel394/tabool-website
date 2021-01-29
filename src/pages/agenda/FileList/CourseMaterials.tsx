import React, {useMemo, useState} from "react";
import {CourseApprox, MaterialApprox} from "types";
import {Box, Button, CircularProgress, ListSubheader, makeStyles, Typography} from "@material-ui/core";
import getPerUniqueValue from "utils/getPerUniqueValue";
import dayjs from "dayjs";
import {replaceDatetime} from "utils";
import {useInfiniteQuery} from "react-query";
import {AxiosError} from "axios";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {IFetchMaterialListData, IFetchMaterialListResponse, useFetchMaterialListAPI} from "hooks/apis";
import sortArray from "sort-array";
import FlipMove from "react-flip-move";
import {useQueryOptions} from "hooks";
import {BsCircleFill} from "react-icons/all";

import Material from "./Material";


export interface ICourseMaterials {
    course: CourseApprox;
}

const useStyles = makeStyles({
    ul: {
        padding: 0,
    },
});

const CourseMaterials = ({
    course,
}: ICourseMaterials) => {
    const {t} = useTranslation();
    const classes = useStyles();
    const fetchMaterials = useFetchMaterialListAPI();
    const queryOptions = useQueryOptions();

    const [loadMore, setLoadMore] = useState<boolean>(false);

    const queryKey = {
        courseId: course.id,
        pageSize: loadMore ? 10 : 5,
    };

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery<IFetchMaterialListResponse, AxiosError, IFetchMaterialListData>(
        ["fetch_materials_course_", queryKey],
        ({pageParam}) => fetchMaterials(queryKey, pageParam),
        {
            ...queryOptions,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            getNextPageParam: lastPage => lastPage.next,
        },
    );

    const materialsPerDate = useMemo(() => {
        if (!data) {
            return [];
        }

        const results = data.pages.reduce((arr, values) => [
            ...arr,
            ...values.results,
        ], [] as MaterialApprox[]);

        const materialsPerDate = getPerUniqueValue(results, {
            getValue: material => replaceDatetime(material.addedAt, "time").toISOString(),
        });

        const orderedMaterials: [string, MaterialApprox[]][] = Object.entries(materialsPerDate).map(([subjectId, materials]) => [
            subjectId,
            sortArray(materials, {
                by: "unix",
                order: "desc",
                undefinedRank: 1,
                computed: {
                    unix: material => material.addedAt?.unix?.(),
                },
            }),
        ]);

        return orderedMaterials;
    }, [data]);

    return (
        <ul>
            <ListSubheader inset={false}>
                <Box py={1} display="flex" alignItems="center">
                    <Box mr={1}>
                        <Typography variant="h5" color="textPrimary">
                            {course.subject.name}
                        </Typography>
                    </Box>
                    {isLoading && <CircularProgress size="1rem" color="inherit" />}
                    {hasNextPage && <BsCircleFill size=".5rem" />}
                </Box>
            </ListSubheader>
            <FlipMove>
                {materialsPerDate.map(([date, materials], index) =>
                    <Box key={date} component="li" mt={5 * Number(Boolean(index))}>
                        <ul className={classes.ul}>
                            <ListSubheader disableSticky>
                                {dayjs(date).format("ll")}
                            </ListSubheader>
                            <FlipMove>
                                {materials.map(material =>
                                    <div key={material.id}>
                                        <Material
                                            id={material.id}
                                            filename={material.name}
                                            size={material.size ?? undefined}
                                            lessonId={material.lesson}
                                        />
                                    </div>)}
                            </FlipMove>
                        </ul>
                    </Box>)}
            </FlipMove>
            {!isLoading && !Object.values(materialsPerDate).length && (
                <Alert severity="info">
                    {t("Keine Materialien verfügbar")}
                </Alert>
            )}
            {isLoading && (
                <Box display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress />
                </Box>
            )}
            {loadMore && !isLoading && !data && (
                <Alert severity="error">
                    {t("Materialien konnten nicht geladen werden.")}
                </Alert>
            )}
            {hasNextPage && (
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Button
                        onClick={() => {
                            if (loadMore) {
                                fetchNextPage();
                            } else {
                                setLoadMore(true);
                            }
                        }}
                    >
                        {t("Mehr laden")}
                    </Button>
                </Box>
            )}
        </ul>
    );
};

export default CourseMaterials;
