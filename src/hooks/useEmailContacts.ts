import {useQuery} from "react-query";
import {AxiosError} from "axios";

import useQueryOptions from "./useQueryOptions";
import {IFetchContactsResponse, useFetchContactsAPI} from "./apis";

const useEmailContacts = (): IFetchContactsResponse | null => {
    const queryOptions = useQueryOptions();
    const fetchContacts = useFetchContactsAPI();

    const {
        data,
        isSuccess,
    } = useQuery<IFetchContactsResponse, AxiosError>(
        "fetch_email_contacts",
        fetchContacts,
        queryOptions,
    );

    return (isSuccess && data) ? data : null;
};

export default useEmailContacts;
