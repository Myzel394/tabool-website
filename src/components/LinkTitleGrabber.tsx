import React, {useState} from "react";
import {IFetchPageTitleResponse, useFetchPageTitleAPI} from "hooks/apis";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {Box, CircularProgress} from "@material-ui/core";
import {useQueryOptions} from "hooks";
import {truncate} from "utils";

export interface ILinkTitleGrabber {
    url?: string;
    parseTitle?: (title: string) => string;
    children?: string;
}

const NO_RETRY_CODES = [
    404, 500, 401, 403, 501, 502,
];

const LinkTitleGrabber = ({
    children,
    parseTitle,
    url: givenUrl,
}: ILinkTitleGrabber) => {
    if (!givenUrl && !children) {
        throw new Error("Either specify `url` or `children`.");
    }

    const queryOptions = useQueryOptions();

    const url = givenUrl ?? children as string;
    const fetchPageTitle = useFetchPageTitleAPI();
    const [title, setTitle] = useState<string>(children ?? "");

    const {
        error,
        isLoading,
    } = useQuery<IFetchPageTitleResponse, AxiosError>(
        ["fetch_title", url],
        () => fetchPageTitle({
            url,
        }),
        {
            ...queryOptions,
            onSuccess: data => {
                const {title} = data;

                if (parseTitle) {
                    setTitle(parseTitle(title));
                } else {
                    const truncatedUrl = truncate(url, 30);

                    setTitle(`${title} (${truncatedUrl})`);
                }
            },
            retry: (count, error) => {
                const serverCode = error.response?.data?.statusCode?.[0];

                if (NO_RETRY_CODES.includes(serverCode)) {
                    return false;
                }
                return count <= 5;
            },
            // Title changes rarely
            refetchOnWindowFocus: false,
        },
    );

    return (
        <Box display="flex" alignItems="center">
            <Box mr={1}>
                {title}
            </Box>
            {isLoading && <CircularProgress size="1rem" />}
        </Box>
    );
};

export default LinkTitleGrabber;
