import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useInfiniteQuery} from "react-query";
import {AxiosError} from "axios";
import {ListItem, ListItemText, useTheme} from "@material-ui/core";
import {TeacherCourseDetail} from "types";
import {IFetchTeacherCourseResponse, useFetchTeacherCourseListAPI} from "hooks/apis";
import tinycolor from "tinycolor2";
import {useQueryOptions} from "hooks";

import BaseSearchField, {ActiveCheckIcon, WindowedList} from "./BaseSearchField";


const StudentCourseField = (props) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchCourses = useFetchTeacherCourseListAPI();
    const theme = useTheme();

    const [search, setSearch] = useState<string>("");

    const {
        data: rawDataGroups,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<IFetchTeacherCourseResponse, AxiosError>(
        ["fetch_teacher_courses", search],
        context => fetchCourses({
            search,
        }, context.pageParam),
        {
            ...queryOptions,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: useQuery ts is wrong
            getNextPageParam: lastPage => lastPage.next,
        },
    );
    const courses = rawDataGroups?.pages?.reduce?.((array, page) => [
        ...array,
        ...page.results,
    ], [] as TeacherCourseDetail[]) ?? [];


    return (
        <BaseSearchField<TeacherCourseDetail>
            {...props}
            elements={courses}
            modalTitle={t("Kurs auswählen")}
            getCaption={course => course.name}
            isLoading={isLoading}
            search={search}
            onSearchChange={setSearch}
        >
            {({onElementSelect, selectedKey}) =>
                <WindowedList<TeacherCourseDetail>
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
                                backgroundColor: tinycolor(course.subject.userRelation.color)
                                    .setAlpha(theme.palette.action.activatedOpacity)
                                    .toString(),
                            } : undefined}
                            onClick={onClick}
                        >
                            <ListItemText
                                primary={course.name}
                                secondary={t("{{count}} Schüler", {
                                    count: course.participantsCount,
                                })}
                            />
                            {isSelected && <ActiveCheckIcon />}
                        </ListItem>
                    }
                </WindowedList>
            }
        </BaseSearchField>
    );
};

export default StudentCourseField;
