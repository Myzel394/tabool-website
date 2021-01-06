import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useInfiniteQuery} from "react-query";
import {AxiosError} from "axios";
import {ListItem, ListItemText, useTheme} from "@material-ui/core";
import {CourseApprox, CourseDetail} from "types";
import {
    IFetchCourseListData,
    IFetchCourseListResponse,
    useFetchCourseDetailAPI,
    useFetchCourseListAPI,
} from "hooks/apis";
import {useQueryOptions} from "hooks";
import tinycolor from "tinycolor2";

import BaseSearchField, {ActiveCheckIcon, WindowedList} from "./BaseSearchField";


const CourseField = (props) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchCourses = useFetchCourseListAPI();
    const fetchSingleCourse = useFetchCourseDetailAPI();
    const theme = useTheme();

    const [search, setSearch] = useState<string>("");

    const {
        data: rawDataGroups,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<IFetchCourseListResponse, AxiosError, IFetchCourseListData>(
        ["fetch_courses", search],
        () => fetchCourses({
            search,
        }),
        {
            ...queryOptions,
            // eslint-disable-next-line no-console
            getNextPageParam: (lastPage) => console.log(lastPage),
        },
    );
    const courses = rawDataGroups?.pages?.reduce?.((array, page) => [
        ...array,
        ...page.results,
    ], [] as CourseApprox[]) ?? [];


    return (
        <BaseSearchField<CourseApprox, CourseDetail>
            {...props}
            elements={courses}
            modalTitle={t("Kurs auswählen")}
            getCaption={course => `${course.name} (${course.teacher.lastName})`}
            isLoading={isLoading}
            search={search}
            getElementFromKey={fetchSingleCourse}
            onSearchChange={setSearch}
        >
            {({onElementSelect, selectedKey}) =>
                <WindowedList<CourseApprox>
                    elements={courses}
                    isFetchingNextPage={isFetchingNextPage}
                    selectedKey={selectedKey}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={Boolean(hasNextPage)}
                    onElementSelect={onElementSelect}
                >
                    {(course, {isSelected, onClick}) =>
                        <ListItem
                            button
                            style={isSelected ? {
                                backgroundColor: tinycolor(course.subject.userRelation.color).setAlpha(theme.palette.action.activatedOpacity).toString(),
                            } : undefined}
                            onClick={onClick}
                        >
                            <ListItemText
                                primary={course.name}
                                secondary={course.teacher.lastName}
                            />
                            {isSelected && <ActiveCheckIcon />}
                        </ListItem>
                    }
                </WindowedList>
            }
        </BaseSearchField>
    );
};

export default CourseField;
