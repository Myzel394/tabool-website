import React, {memo, useState} from "react";
import {IFetchTeacherListData, IFetchTeacherListResponse, useFetchTeacherListAPI} from "hooks/apis";
import {useInfiniteQuery} from "react-query";
import {AxiosError} from "axios";
import {useQueryOptions} from "hooks";
import {useTranslation} from "react-i18next";
import {TeacherApprox} from "types";
import {Avatar, ListItem, ListItemAvatar} from "@material-ui/core";
import {FaFemale, FaGenderless, FaMale} from "react-icons/all";

import genderColor from "../../../constants/genderColor";
import {Gender} from "../../../api";

import BaseSearchField from "./BaseSearchField";


const TeacherField = (props) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchTeachers = useFetchTeacherListAPI();

    const [search, setSearch] = useState<string>("");

    const {
        data: rawDataGroups,
        isLoading,
    } = useInfiniteQuery<IFetchTeacherListResponse, AxiosError, IFetchTeacherListData>(
        [fetchTeachers, search],
        () => fetchTeachers({
            search,
        }),
        {
            ...queryOptions,
            // eslint-disable-next-line no-console
            getNextPageParam: (lastPage) => console.log(lastPage),
        },
    );
    const teachers = rawDataGroups?.pages?.reduce?.((array, page) => [
        ...array,
        ...page.results,
    ], [] as TeacherApprox[]);

    return (
        <BaseSearchField<TeacherApprox>
            {...props}
            elements={teachers}
            modalTitle={t("Lehrer auswählen")}
            getCaption={teacher => `${teacher.shortName} ${teacher.lastName} (${teacher.shortName})`}
            isLoading={isLoading}
            search={search}
            onSearchChange={setSearch}
        >
            {(teacher, {iSelected, onSelect}) =>
                <ListItem>
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
                                [Gender.Unknown]: null,
                            }[teacher.gender]}
                        </Avatar>
                    </ListItemAvatar>
                </ListItem>
            }
        </BaseSearchField>
    );
};

export default memo(TeacherField);
