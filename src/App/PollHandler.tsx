import React from "react";
import {useQueryOptions, useUser} from "hooks";
import {useQuery} from "react-query";
import {IFetchPollResponse, useFetchPollListAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {Poll} from "components";


export interface IPollHandler {
    children: JSX.Element;
}


const PollHandler = ({children}: IPollHandler) => {
    const user = useUser();
    const queryOptions = useQueryOptions();
    const fetchPolls = useFetchPollListAPI();

    const {
        data,
    } = useQuery<IFetchPollResponse, AxiosError, void>(
        "fetch_polls",
        fetchPolls,
        {
            ...queryOptions,
            enabled: user.isAuthenticated,
        },
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
                minVoteChoices={poll.minVoteChoices}
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
