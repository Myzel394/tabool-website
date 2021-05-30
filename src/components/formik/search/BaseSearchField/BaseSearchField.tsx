import React, {Context, ReactNode, useCallback, useRef, useState} from "react";
import {Autocomplete, AutocompleteProps, createFilterOptions} from "@material-ui/lab";
import {TextFieldProps} from "@material-ui/core";
import {FieldProps} from "formik";
import {useTranslation} from "react-i18next/src";
import {FilterOptionsState} from "@material-ui/lab/useAutocomplete/useAutocomplete";

import useQuery, {QueryResult} from "./useQuery";
import useFillField from "./useFillField";
import useRenderers from "./useRenderers";
import SearchFieldContext, {ISearchFieldContext} from "./SearchFieldContext";
import SearchModal from "./SearchModal";

const MORE_AVAILABLE_SYMBOL = Symbol("more-available");

interface MoreAvailableType {
    [MORE_AVAILABLE_SYMBOL]: true;
    title: string;
}

const filter = createFilterOptions();

export type ISearchField<
    DataType,
    KeyType = string,
    QueryResponse = QueryResult<DataType>
> = FieldProps & Omit<
    AutocompleteProps<DataType, false, false, false>,
    "renderInput" |
    "getOptionSelected" |
    "value" |
    "options" |
    "inputValue" |
    "onInputChange" |
    "onChange"
    > & {
    getKeyFromElement: (element: Readonly<DataType>) => KeyType;
    children: (
        element: Readonly<DataType>,
        isSelected: boolean,
        onThisSelect: () => any,
        isParentSelected: boolean
    ) => ReactNode;

    flattenResults: (page: QueryResponse) => DataType[];
    fetchElements: (search: string, page: number) => Promise<QueryResponse>;
    fetchSingleLabel: (key: KeyType) => Promise<string>;
    filterElements: (elements: DataType[], search: string, selectedKey: KeyType | null) => DataType[];
    queryKey: string;
    getOptionLabel: (element: DataType) => string;
    initialSearchValue: string;

    modalTitle?: string;
    searchPlaceholder?: string;

    onChange?: (key: KeyType | null, data: DataType | null) => any;
    label?: string;
    required?: boolean;

    textFieldProps?: Omit<TextFieldProps, "label" | "required">;
};

const SearchField = <
    DataType extends Record<string, any>,
    QueryResponse = QueryResult<DataType>,
    KeyType = string,
>({
        getKeyFromElement,
        filterElements,
        fetchSingleLabel,
        queryKey,
        textFieldProps,
        initialSearchValue,
        fetchElements,
        flattenResults,
        field,
        label,
        required,
        getOptionLabel,
        onChange,
        children: renderElement,
        renderOption,
        form,
        meta,
        modalTitle,
        searchPlaceholder,
        filterOptions,
        disabled,
        ...other
    }: ISearchField<DataType, KeyType, QueryResponse>) => {
    const {t} = useTranslation();
    // $hasModified function should only be applied if there's an initial value
    const $hasModified = useRef<boolean>(Boolean(field.value));

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [search, setSearch] = useState<string>(initialSearchValue);

    const selectedKey = field.value ?? null;
    // MUI shows the id if the field hasn't been modified once, so just show nothing to avoid showing the ID to the user
    // (which would be strange to the user to see)
    const shownValue = $hasModified.current ? field.value : "";

    const setFieldValue = useCallback((option: DataType | null) => {
        const key = option?._searchFieldKey;
        field.onChange({
            target: {
                value: key,
                name: field.name,
            },
        });
        onChange?.(key, option);
    }, [field, onChange]);

    const {
        hasNextPage,
        findElementByKey,
        fetchNextPage,
        elements,
        isFetching,
    } = useQuery<DataType, QueryResponse, KeyType>({
        selectedKey,
        getKeyFromElement,
        filterElements,
        flattenResults,
        fetchElements,
        queryKey,
        search,
    });

    const isFetchingLabel = useFillField<DataType, KeyType>({
        getOptionLabel,
        value: field.value,
        findElementByKey,
        elements,
        updateSearchValue: setInputValue,
        $hasModified,
        updateFieldValue: setFieldValue,
        fetchLabel: fetchSingleLabel,
    });

    const {
        renderInput,
        renderOption: renderAutocompleteOption,
        getTextFromOption,
    } = useRenderers({
        isFetching: isFetching || isFetchingLabel,
        updateIsOpen: setIsOpen,
        textFieldProps: {
            ...textFieldProps,
            name: field.name,
            label,
            required,
        },
        getOptionLabel,
        disabled,
        findElementByKey,
        customRenderOption: renderOption,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ModalContext = SearchFieldContext as Context<ISearchFieldContext<DataType, KeyType>>;

    return (
        <>
            <Autocomplete<DataType>
                autoHighlight
                disabled={disabled}
                {...other}
                renderInput={renderInput}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore: value is custom type
                getOptionSelected={(option, value: KeyType) => option._searchFieldKey === value}
                getOptionLabel={getTextFromOption}
                renderOption={renderAutocompleteOption}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                filterOptions={(options, params) => {
                    const defaultFilterFn = filter as ((option: DataType[], state: FilterOptionsState<DataType>) => (DataType | MoreAvailableType)[]);

                    const filtered = filterOptions
                        ? filterOptions(options, params)
                        : defaultFilterFn(options, params);

                    // Add more available information
                    if (params.inputValue === "" && hasNextPage) {
                        filtered.push({
                            [MORE_AVAILABLE_SYMBOL]: true,
                            title: t("Mehr verfügbar. Nutze die Suche um die anderen zu finden."),
                        });
                    }

                    return filtered;
                }}
                value={shownValue}
                options={elements}
                inputValue={inputValue}
                onInputChange={(event, value) => {
                    $hasModified.current = true;
                    setInputValue(value);
                }}
                onChange={(event, option) => {
                    if (option) {
                        setFieldValue(option);
                    }
                }}
                onBlur={field.onBlur}
            />
            <ModalContext.Provider
                value={{
                    hasNextPage,
                    fetchNextPage,
                    getKeyFromElement,
                    isOpen,
                    selectedKey,
                    elements,
                    search,
                    searchPlaceholder,
                    renderElement,
                    updateSelectedKey: key => {
                        if (key) {
                            const data = findElementByKey(key);

                            if (data) {
                                setFieldValue(data);
                            }
                        } else {
                            setFieldValue(null);
                        }
                    },
                    title: modalTitle || t("Auswählen"),
                    required: Boolean(required),
                    onClose: () => setIsOpen(false),
                    isFetching,
                    updateSearch: setSearch,
                }}
            >
                <SearchModal />
            </ModalContext.Provider>
        </>
    );
};

SearchField.defaultProps = {
    initialSearchValue: "",
    flattenResults: page => page.results,
    getKeyFromElement: element => element.id,
};

export default SearchField;
