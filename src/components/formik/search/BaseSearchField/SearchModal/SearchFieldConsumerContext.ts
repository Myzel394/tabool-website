import {createContext} from "react";

export interface ISearchFieldConsumerContext<
    DataType = any,
    KeyType = string,
    > {
    parentSelectedKey: KeyType | null;
    selectedKey: KeyType | null;
    onSelect: (newKey: KeyType | null) => any;

    elements: DataType[];
    hasNextPage: boolean;
    isFetching: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const SearchFieldConsumerContext = createContext<ISearchFieldConsumerContext>();

export default SearchFieldConsumerContext;
