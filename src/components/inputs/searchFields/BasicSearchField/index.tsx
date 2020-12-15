import React, {useMemo, useState} from "react";
import {Button, FormGroup, FormHelperText} from "@material-ui/core";
import {useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {useDebouncedValue} from "@shopify/react-hooks";
import {AxiosError} from "axios";

import SelectMenu, {ISelectMenu} from "./SelectMenu";

export interface SearchFieldExtend<DataType = any> extends Omit<
    IBasicSearchField<DataType>,
    "title"
    | "renderListElement"
    | "queryFunction"
    | "queryKey"
    | "searchPlaceholder"
    | "onSelect"
    | "searchParam"
    | "extractData"
    | "filterData"
    | "modalTitle"
    | "getKeyFromData"
    > {
    onChange: (value: DataType) => void;
}


export interface IBasicSearchField<DataType = any, KeyType = string> extends Omit<
    ISelectMenu<DataType, KeyType>,
    "title" |
    "isOpen" |
    "isError" |
    "isFetching" |
    "data" |
    "onClose" |
    "onSearch" |
    "searchValue" |
    "onSearchChange"
    > {
    title: string;
    queryKey: string;

    searchParam: string;
    filterData: (givenData: DataType[], searchValueLowerCased: string, searchValue: string) => DataType[];
    extractData: (data: DataType[]) => DataType[];
    queryFunction: (...args: any[]) => any;

    modalTitle: ISelectMenu<DataType, KeyType>["title"];

    errorMessages?: string[];
}

const BasicSearchField = <
    DataType extends any = any,
    KeyType = string,
    >({
        title,
        modalTitle,
        queryFunction,
        onSelect,
        filterData,
        errorMessages,
        selectedValue,
        queryKey,
        extractData,
        ...other
    }: IBasicSearchField<DataType, KeyType>) => {
    const queryOptions = useQueryOptions();

    const [search, setSearch] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const searchParam = useDebouncedValue(search);

    const {
        isFetching,
        isError,
        data: rawData,
    } = useQuery<any, AxiosError>(
        [queryKey, searchParam],
        queryFunction,
        {
            refetchOnWindowFocus: isOpen,
            ...queryOptions,
            keepPreviousData: true,
        },
    );
    const data = useMemo(() => {
        return rawData
            ? filterData(
                extractData(rawData),
                searchValue.toLocaleLowerCase(),
                searchValue,
            )
            : [];
    }, [rawData, filterData, extractData, searchValue]);

    return (
        <>
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
            <SelectMenu
                {...other}
                isError={isError}
                isFetching={isFetching}
                title={modalTitle}
                searchValue={searchValue}
                isOpen={isOpen}
                data={data}
                selectedValue={selectedValue}
                onClose={() => setIsOpen(false)}
                onSelect={element => {
                    setIsOpen(false);
                    onSelect(element);
                }}
                onSearch={value => setSearch(value)}
                onSearchChange={value => setSearchValue(value)}
            />
        </>
    );
};

BasicSearchField.defaultProps = {
    searchParam: "search",
    extractData: data => data?.results ?? [],
};

export default BasicSearchField;
