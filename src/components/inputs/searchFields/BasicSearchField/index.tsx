import React, {useMemo, useState} from "react";
import {Button, FormGroup, FormHelperText} from "@material-ui/core";
import {useQueryOptions} from "hooks";
import {QueryFunction, useQuery} from "react-query";

import SelectMenu from "./SelectMenu";


export interface IBasicSearchField {
    title: string;
    modalTitle: string;
    queryKey: string;

    searchParam: string;
    searchPlaceholder: string;
    renderListElement: (element, props, isSelected: boolean) => JSX.Element;
    filterData: (givenData: any[], searchValueLowerCased: string, searchValue: string) => any[];
    extractData: (data) => any[];
    queryFunction: QueryFunction<any>;
    getKeyFromData: (data: any) => any;

    onSelect: (data) => void;

    errorMessages?: string[];
    listItemSize?: number;
    value: any;
}

const BasicSearchField = ({
    title,
    modalTitle,
    queryKey,
    searchParam,
    renderListElement,
    extractData,
    queryFunction,
    searchPlaceholder,
    onSelect,
    filterData,
    errorMessages,
    listItemSize,
    getKeyFromData,
    value,
}: IBasicSearchField) => {
    const [filterSearch, setFilterSearch] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const queryOptions = useQueryOptions();
    const {isFetching, isError, data: rawData} = useQuery(
        [queryKey, {[searchParam]: search}],
        queryFunction,
        {
            ...queryOptions,
            keepPreviousData: true,
        },
    );
    const data = useMemo(() => {
        return filterData(extractData(rawData), filterSearch.toLocaleLowerCase(), filterSearch);
    }, [rawData, filterData, filterSearch]);

    return (
        <>
            <SelectMenu
                getKeyFromData={getKeyFromData}
                isError={isError}
                isFetching={isFetching}
                title={modalTitle}
                searchValue={search}
                searchPlaceholder={searchPlaceholder}
                isOpen={isOpen}
                data={data}
                renderListElement={renderListElement}
                listItemSize={listItemSize || 50}
                value={value}
                onClose={() => setIsOpen(false)}
                onSelect={element => {
                    setIsOpen(false);
                    onSelect(element);
                }}
                onFilter={element => setFilterSearch(element)}
                onSearch={value => setSearch(value)}
            />
            <FormGroup>
                <Button
                    variant="outlined"
                    color="default"
                    onClick={() => setIsOpen(true)}
                >
                    {title}
                </Button>
                {errorMessages &&
                    <FormHelperText error>
                        {errorMessages.map(error => <span key={error}>{error}</span>)}
                    </FormHelperText>
                }
            </FormGroup>
        </>
    );
};

BasicSearchField.defaultProps = {
    searchParam: "search",
    extractData: data => data?.results ?? [],
};

export default BasicSearchField;
