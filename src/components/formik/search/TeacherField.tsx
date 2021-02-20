import genderColor from "constants/genderColor";

import React, {memo, useState} from "react";
import {IFetchTeacherResponse, useFetchTeacherDetailAPI, useFetchTeacherListAPI} from "hooks/apis";
import {useInfiniteQuery} from "react-query";
import {AxiosError} from "axios";
import {useQueryOptions} from "hooks";
import {useTranslation} from "react-i18next";
import {TeacherApprox} from "types";
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import {FaFemale, FaGenderless, FaMale} from "react-icons/all";
import {Gender} from "api";

import BaseSearchField, {ActiveCheckIcon, useSelectedColors, WindowedList} from "./BaseSearchField";


const TeacherField = (props) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchTeachers = useFetchTeacherListAPI();
    const fetchTeacher = useFetchTeacherDetailAPI();
    const {
        backgroundColor,
    } = useSelectedColors();

    const [search, setSearch] = useState<string>("");

    const {
        data: rawDataGroups,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<IFetchTeacherResponse, AxiosError>(
        ["fetch_teachers", search],
        context => fetchTeachers({
            search,
            pageSize: context.pageParam,
        }),
        {
            ...queryOptions,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: useQuery ts is wrong
            getNextPageParam: lastPage => lastPage.next,
        },
    );
    const teachers = rawDataGroups?.pages?.reduce?.((array, page) => [
        ...array,
        ...page.results,
    ], [] as TeacherApprox[]) ?? [];

    return (
        <BaseSearchField<TeacherApprox>
            {...props}
            elements={teachers}
            modalTitle={t("Lehrer auswählen")}
            getCaption={teacher => `${teacher.shortName} ${teacher.lastName} (${teacher.shortName})`}
            isLoading={isLoading}
            search={search}
            getElementFromKey={fetchTeacher}
            onSearchChange={setSearch}
        >
            {({onElementSelect, selectedKey}) =>
                <WindowedList<TeacherApprox>
                    elements={teachers}
                    isFetchingNextPage={isFetchingNextPage}
                    selectedKey={selectedKey}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={Boolean(hasNextPage)}
                    onElementSelect={onElementSelect}
                >
                    {(teacher, {isSelected, onClick}) =>
                        <ListItem
                            button
                            style={isSelected ? {
                                backgroundColor,
                            } : undefined}
                            onClick={onClick}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    style={{
                                        backgroundColor: genderColor[teacher.gender],
                                    }}
                                >
                                    {{
                                        [Gender.Male]: <FaMale />,
                                        [Gender.Female]: <FaFemale />,
                                        [Gender.Diverse]: <FaGenderless />,
                                    }[teacher.gender]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${teacher.lastName}`}
                                secondary={`${teacher.shortName}`}
                            />
                            {isSelected && <ActiveCheckIcon />}
                        </ListItem>
                    }
                </WindowedList>
            }
        </BaseSearchField>
    );
};

export default memo(TeacherField);
