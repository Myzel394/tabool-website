import {createContext, ReactNode} from "react";

export interface ISearchFieldContext<
    DataType = any,
    KeyType = string
    > {
    isOpen: boolean;
    onClose: () => any;
    title: string;

    searchPlaceholder?: string;

    required: boolean;

    search: string;
    updateSearch: (newSearch: string) => any;

    selectedKey: KeyType | null;
    updateSelectedKey: (key: KeyType | null) => any;

    fetchNextPage: () => any;

    elements: DataType[];
    hasNextPage: boolean;
    isFetching: boolean;
    renderElement: (
        element: Readonly<DataType>,
        isSelected: boolean,
        onThisSelect: () => any,
        isParentSelected: boolean,
    ) => ReactNode;
    getKeyFromElement: (element: DataType) => KeyType;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const SearchFieldContext = createContext<ISearchFieldContext>();

export default SearchFieldContext;
