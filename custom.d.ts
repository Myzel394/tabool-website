declare module "react-query" {
    export * from "react-query/types/index";
    import {QueryFunction, QueryKey} from "react-query/types/core/types";
    import {UseQueryOptions, UseQueryResult} from "react-query/types/react/types";

    export declare function useQuery<TData = unknown, TError = unknown, TQueryFnData = TData>(options: UseQueryOptions<TData, TError, TQueryFnData>): UseQueryResult<TData, TError>; // prettier-ignore
    export declare function useQuery<TData = unknown, TError = unknown, TQueryFnData = TData>(queryKey: QueryKey, options?: UseQueryOptions<TData, TError, TQueryFnData>): UseQueryResult<TData, TError>; // prettier-ignore
    export declare function useQuery<TData = unknown, TError = unknown, TQueryFnData = TData>(queryKey: QueryKey, queryFn: QueryFunction</* TQueryFnData | */ TData>, options?: UseQueryOptions<TData, TError, TQueryFnData>): UseQueryResult<TData, TError>; // prettier-ignore
}
