import {useDebouncedValue} from "@shopify/react-hooks";
import {useInfiniteQuery} from "react-query";
import {AxiosError} from "axios";
import {useCallback, useMemo} from "react";
import {useQueryOptions} from "hooks";
import {PaginatedResponse} from "types";

export interface IUseQuery<
    DataType,
    QueryResponse,
    KeyType
    > {
    search: string;
    queryKey: string;

    selectedKey: KeyType | null;

    fetchElements: (search: string, page: number) => Promise<QueryResponse>;
    flattenResults: (page: QueryResponse) => DataType[];
    filterElements: (elements: DataType[], search: string, selectedKey: KeyType | null) => DataType[];
    getKeyFromElement: (element: Readonly<DataType>) => KeyType;
}

export interface IUseQueryResult<
    DataType,
    KeyType
    > {
    elements: DataType[];
    findElementByKey: (key: KeyType) => DataType | undefined;

    isFetching: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => any;
}

export type QueryResult<DataType> = PaginatedResponse<DataType>;
export type WithKey<DataType, KeyType> = DataType & {
    _searchFieldKey: KeyType;
};

const EMPTY_ARRAY = [];

const useQuery = <
    DataType,
    QueryResponse,
    KeyType,
    >({
        search,
        queryKey,
        flattenResults,
        filterElements,
        selectedKey,
        getKeyFromElement,
        fetchElements,
    }: IUseQuery<DataType, QueryResponse, KeyType>): IUseQueryResult<DataType, KeyType> => {
    const queryOptions = useQueryOptions();
    const querySearch = useDebouncedValue(search, {
        timeoutMs: 500,
    });
    const {
        isFetching,
        fetchNextPage,
        hasNextPage,
        data,
    } = useInfiniteQuery<QueryResponse, AxiosError, QueryResponse>(
        [queryKey, querySearch],
        ({pageParam}) => fetchElements(search, pageParam),
        queryOptions,
    );
    const elements = useMemo(() => {
        if (data) {
            const addKeys = (elements: DataType[]): WithKey<DataType, KeyType>[] => elements.map(element => ({
                ...element,
                _searchFieldKey: getKeyFromElement(element),
            }));

            const flattenElements = data.pages.reduce((accumulator, page) => [
                ...accumulator,
                ...flattenResults(page),
            ], [] as DataType[]);

            const elementsWithKeys = addKeys(flattenElements);

            return elementsWithKeys;
        }

        return EMPTY_ARRAY;
    }, [data, flattenResults, getKeyFromElement]) as WithKey<DataType, KeyType>[];
    const filteredElements = useMemo(
        () => filterElements(elements, search.toLowerCase(), selectedKey),
        [elements, search, selectedKey, filterElements],
    ) as WithKey<DataType, KeyType>[];

    const findElementByKey = useCallback(
        (key: KeyType) => filteredElements.find(element => element._searchFieldKey === key),
        [filteredElements],
    );

    return {
        isFetching,
        hasNextPage: Boolean(hasNextPage),
        fetchNextPage,
        findElementByKey,
        elements: filteredElements,
    };
};

export default useQuery;
