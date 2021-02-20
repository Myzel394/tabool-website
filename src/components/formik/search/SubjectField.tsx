import React, {memo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useInfiniteQuery} from "react-query";
import {AxiosError} from "axios";
import {ListItem, ListItemText, useTheme} from "@material-ui/core";
import tinycolor from "tinycolor2";
import {Subject} from "types";
import {IFetchSubjectResponse, useFetchSubjectDetailAPI, useFetchSubjectListAPI} from "hooks/apis";
import {useQueryOptions} from "hooks";

import BaseSearchField, {ActiveCheckIcon, WindowedList} from "./BaseSearchField";


const SubjectField = (props) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const queryOptions = useQueryOptions();
    const fetchSubjects = useFetchSubjectListAPI();
    const fetchSubject = useFetchSubjectDetailAPI();

    const [search, setSearch] = useState<string>("");

    const {
        data: rawDataGroups,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<IFetchSubjectResponse, AxiosError>(
        ["fetch_subjects", search],
        () => fetchSubjects({
            search,
        }),
        {
            ...queryOptions,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: useQuery ts is wrong
            getNextPageParam: lastPage => lastPage.next,
        },
    );
    const subjects = rawDataGroups?.pages?.reduce?.((array, page) => [
        ...array,
        ...page.results,
    ], [] as Subject[]) ?? [];

    return (
        <BaseSearchField<Subject>
            {...props}
            elements={subjects}
            modalTitle={t("Fach auswählen")}
            getCaption={subject => `${subject.name} (${subject.shortName})`}
            isLoading={isLoading}
            search={search}
            getElementFromKey={fetchSubject}
            onSearchChange={setSearch}
        >
            {({onElementSelect, selectedKey}) =>
                <WindowedList<Subject>
                    elements={subjects}
                    isFetchingNextPage={isFetchingNextPage}
                    selectedKey={selectedKey}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={Boolean(hasNextPage)}
                    onElementSelect={onElementSelect}
                >
                    {(subject, {isSelected, onClick}) =>
                        <ListItem
                            button
                            style={isSelected ? {
                                backgroundColor: tinycolor(subject.userRelation.color).setAlpha(theme.palette.action.activatedOpacity).toString(),
                            } : undefined}
                            onClick={onClick}
                        >
                            <ListItemText
                                primary={`${subject.name}`}
                                secondary={`${subject.shortName}`}
                            />
                            {isSelected && <ActiveCheckIcon />}
                        </ListItem>
                    }
                </WindowedList>
            }
        </BaseSearchField>
    );
};

export default memo(SubjectField);
