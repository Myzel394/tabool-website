import React, {useState} from "react";
import {useInfiniteQuery} from "react-query";
import {useFetchHomeworkListAPI, useQueryOptions} from "hooks";
import {Box, FormControlLabel} from "@material-ui/core";
import {HomeworkApprox} from "types";
import {Homework, SearchPage} from "components";
import {useDebouncedValue} from "@shopify/react-hooks";
import {useTranslation} from "react-i18next";
import FlipMove from "react-flip-move";

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
            orderings={[
                {
                    name: "Fälligkeitsdatum",
                    value: "due_date",
                },
            ]}
            title={t("Hausaufgaben suchen")}
            ordering={ordering}
            fullAmount={rawDataGroups?.[0].count ?? 0}
            isFetching={isLoading}
            containsMore={canFetchMore ?? false}
            fetchMore={fetchMore}
            search={search}
            data={homeworks}
            sampleElement={renderElement}
            renderElement={({data, style}) => {
                return (
                    <FlipMove
                        key={data.id}
                    >
                        <Box
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
                    </FlipMove>
                );
            }}
            filtering={(
                <>
                    <FormControlLabel label={t("")} />
                </>
            )}
            onOrderingChange={setOrdering}
            onSearchChange={setSearch}
        />
    );
};


export default HomeworkListPage;
