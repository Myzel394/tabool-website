import React from "react";
import {useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {IFetchPollsResponse, useFetchPollsAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {Poll} from "components";


export interface IPollHandler {
    children: JSX.Element;
}


const PollHandler = ({children}: IPollHandler) => {
    const queryOptions = useQueryOptions();
    const fetchPolls = useFetchPollsAPI();

    const {
        data,
    } = useQuery <IFetchPollsResponse, AxiosError, void>(
        "fetch_polls",
        fetchPolls,
        queryOptions,
    );
    const notVoted = data?.results?.filter?.(poll => !poll.hasVoted);
    const poll = notVoted?.[0];

    return (
        <>
            {children}
            {poll &&
                <Poll
                    key={poll.id}
                    id={poll.id}
                    maxVoteChoices={poll.maxVoteChoices}
                    maxVoteDate={poll.maxVoteDate}
                    choices={poll.choices}
                    title={poll.title}
                />
            }
        </>
    );
};

export default PollHandler;
