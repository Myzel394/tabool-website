import {useQuery} from "react-query";

import useFetchContactsAPI, {IFetchContactsResponse} from "./apis/fetch/useFetchContactsAPI";
import useQueryOptions from "./useQueryOptions";

const useEmailContacts = (): IFetchContactsResponse | null => {
    const queryOptions = useQueryOptions();
    const fetchContacts = useFetchContactsAPI();

    const {data, isSuccess} = useQuery("fetch_email_contacts", fetchContacts, queryOptions);

    return isSuccess ? data : null;
};

export default useEmailContacts;
