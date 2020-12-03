import React, {memo, useState} from "react";
import {useInfiniteQuery} from "react-query";
import {useFetchHomeworkListAPI, useQueryOptions} from "hooks";
import SearchPage from "components/pages/SearchPage";
import {Box} from "@material-ui/core";
import {HomeworkApprox} from "types";
import {Homework} from "components";
import {useDebouncedValue} from "@shopify/react-hooks";
import {useTranslation} from "react-i18next";

const HomeworkListPage = () => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchHomework = useFetchHomeworkListAPI();

    const [page, setPage] = useState<number>(1);
    const [ordering, setOrdering] = useState<string>("due_date");
    const [search, setSearch] = useState<string>("");
    const [homeworks, setHomeworks] = useState<HomeworkApprox[]>([]);

    const debouncedSearch = useDebouncedValue<string>(search);
    const {
        data: rawDataGroups,
        isLoading,
        fetchMore,
        canFetchMore,
    } = useInfiniteQuery([debouncedSearch, page, {ordering}], fetchHomework, {
        ...queryOptions,
        onSuccess: data => setHomeworks(
            data.reduce((previousValue, currentValue) => [
                ...previousValue,
                ...currentValue.results,
            ], []),
        ),
        getFetchMore: (lastPage => lastPage.next),
    });

    const renderElement = ({data, style}) => (
        <Box py={2}>
            <Homework subject={data.subject} information={data.truncatedInformation} id={data.id} creationDate={data.createdAt} />
        </Box>
    );

    return (
        <SearchPage<HomeworkApprox>
            title={t("Hausaufgaben suchen")}
            search={search}
            ordering={ordering}
            fullAmount={rawDataGroups?.[0].count ?? 0}
            isFetching={isLoading}
            containsMore={canFetchMore ?? false}
            fetchMore={fetchMore}
            orderings={[
                {
                    name: "Fälligkeitsdatum",
                    value: "due_date",
                },
            ]}
            data={homeworks}
            sampleElement={renderElement}
            renderElement={({data, style}) => {
                return (
                    <Box
                        key={data.id}
                        style={style}
                        py={1}
                    >
                        <Homework
                            subject={data.subject}
                            information={data.truncatedInformation}
                            id={data.id}
                            creationDate={data.createdAt}
                        />
                    </Box>
                );
            }}
            onOrderingChange={setOrdering}
            onSearchChange={setSearch}
        />
    );
};


export default memo(HomeworkListPage);
