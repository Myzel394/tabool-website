import React, {memo, useMemo, useState} from "react";
import {useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import fetchSubjects from "api/schoolData/fetchSubjects";
import {Subject} from "types/subject";

import SubjectList from "./SubjectList";

export interface ISubjectManager {

}

const SubjectManager = (props: ISubjectManager) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    const queryOptions = useQueryOptions();
    const {data: rawData, isError, isFetching} = useQuery(["subject", {search}], fetchSubjects, queryOptions);
    const searchLower = search.toLowerCase();
    const data = useMemo(() => {
        const data = rawData?.results || [];

        return data.filter((element: Subject) =>
            element.name.toLowerCase().includes(searchLower));
    }, [rawData, searchLower]);


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
