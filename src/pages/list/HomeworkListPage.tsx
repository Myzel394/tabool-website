import React, {memo, useState} from "react";
import {useQuery} from "react-query";
import {useFetchHomeworkListAPI, useQueryOptions} from "hooks";
import SearchPage from "components/pages/SearchPage";
import {Grid} from "@material-ui/core";
import {HomeworkDetail} from "types";
import {Homework} from "components";
import {useDebouncedValue} from "@shopify/react-hooks";

const HomeworkListPage = () => {
    const queryOptions = useQueryOptions();
    const fetchHomework = useFetchHomeworkListAPI();

    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebouncedValue<string>(search);

    const {data} = useQuery(debouncedSearch, fetchHomework, queryOptions);

    return (
        <SearchPage
            search={search}
            data={data?.results}
            renderElement={(homework: HomeworkDetail) => (
                <Grid key={homework.id} item>
                    <Homework
                        subject={homework.lesson.lessonData.course.subject}
                        information={homework.information}
                        id={homework.id}
                        creationDate={homework.createdAt}
                        onServerUpdate={() => null}
                    />
                </Grid>
            )}
            onSearchChange={setSearch}
        />
    );
};


export default memo(HomeworkListPage);
