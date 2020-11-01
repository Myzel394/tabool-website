import React, {memo, useState} from "react";
import {useFetchSubjectListAPI, useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {Subject} from "types/subject";

import SubjectList from "./SubjectList";

export interface ISubjectManager {

}

const SubjectManager = (props: ISubjectManager) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    const fetchSubjects = useFetchSubjectListAPI();
    const queryOptions = useQueryOptions();
    const {data: rawData, isError, isFetching} = useQuery(
        ["subject", {search}],
        fetchSubjects,
        queryOptions,
    );
    const searchLower = search.toLowerCase();
    const data = (rawData?.results || []).filter((element: Subject) =>
        element.name.toLowerCase().includes(searchLower));


    return (
        <SubjectList
            data={data}
            searchValue={searchValue}
            isFetching={isFetching}
            onSearchValueChange={value => setSearchValue(value)}
            onSearch={value => setSearch(value)}
        />
    );
};

export default memo(SubjectManager);
