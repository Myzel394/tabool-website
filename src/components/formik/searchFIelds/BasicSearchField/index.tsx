import React, {useMemo, useState} from "react";
import {Button, FormControl, FormHelperText, FormLabel} from "@material-ui/core";
import {useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {useDebouncedValue} from "@shopify/react-hooks";
import {AxiosError} from "axios";
import {FieldProps} from "formik";

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
    | "selectedValue"
    > {
    onChange: (value: DataType) => void;
    onBlur: () => any;
}


export type IBasicSearchField<DataType = any, KeyType = string> = Omit<
    ISelectMenu<DataType, KeyType>,
    "title" |
    "isOpen" |
    "isError" |
    "isFetching" |
    "data" |
    "onClose" |
    "onSearch" |
    "searchValue" |
    "onSearchChange" |
    "onChange"
    > & FieldProps & {
    title: string;
    queryKey: string;

    searchParam: string;
    filterData: (givenData: DataType[], searchValueLowerCased: string, searchValue: string) => DataType[];
    extractData: (data: DataType[]) => DataType[];
    queryFunction: (...args: any[]) => any;

    modalTitle: ISelectMenu<DataType, KeyType>["title"];

    onSelect: (data: DataType) => void;

    helperText?: string;
    label?: string;
};

const BasicSearchField = <
    DataType,
    KeyType = string,
    >({
        title,
        label,
        helperText,
        modalTitle,
        queryFunction,
        onSelect,
        filterData,
        queryKey,
        extractData,
        field,
        form,
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
    } = useQuery<DataType[], AxiosError>(
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
    const error = form.touched[field.name] && form.errors[field.name];

    return (
        <>
            <FormControl>
                <FormLabel>
                    {label}
                </FormLabel>
                <Button
                    variant="outlined"
                    onClick={() => setIsOpen(true)}
                >
                    {title}
                </Button>
                <FormHelperText error={Boolean(error)}>
                    {error ?? helperText}
                </FormHelperText>
            </FormControl>
            <SelectMenu
                {...other}
                isError={isError}
                isFetching={isFetching}
                title={modalTitle}
                searchValue={searchValue}
                isOpen={isOpen}
                data={data}
                selectedKey={field.value}
                onClose={() => {
                    setIsOpen(false);
                    field.onBlur({
                        target: {
                            name: field.name,
                        },
                    });
                }}
                onChange={event => {
                    setIsOpen(false);
                    // eslint-disable-next-line no-console
                    console.log(field);
                    field.onChange({
                        ...event,
                        target: {
                            ...event.target,
                            name: field.name,
                        },
                    });
                    onSelect(event.target.element);
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
