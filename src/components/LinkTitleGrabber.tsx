import React, {useState} from "react";
import {IFetchPageTitleResponse, useFetchPageTitleAPI, useFetchPageTitleLocally} from "hooks/apis";
import {useQuery} from "react-query";
import {AxiosError} from "axios";

import {useQueryOptions} from "../hooks";

export interface ILinkTitleGrabber {
    url?: string;
    parseTitle?: (title: string) => string;
    children?: string;
}


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
    const fetchPageTitleLocally = useFetchPageTitleLocally();
    const [title, setTitle] = useState<string>(children ?? "");

    const {
        error,
    } = useQuery<IFetchPageTitleResponse, AxiosError>(
        ["fetch_title", url],
        () => {
            const payload = {
                url,
            };

            if (error?.response?.data?.blocked) {
                return fetchPageTitleLocally(payload);
            }
            return fetchPageTitle(payload);
        },
        {
            ...queryOptions,
            onSuccess: data => {
                const {title} = data;

                if (parseTitle) {
                    setTitle(parseTitle(title));
                } else {
                    setTitle(title);
                }
            },
            // Title changes rarely
            refetchOnWindowFocus: false,
        },
    );

    return title;
};

export default LinkTitleGrabber;
