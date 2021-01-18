import {Dayjs} from "dayjs";

export interface PollChoice {
    text: string;
    color: string;
    id: string;
}

export interface VoteResult {
    choiceId: string;
    percentageValue: number;
}

export interface UserVote {
    createdAt: Dayjs;
    id: string;
    choices: string[];
}

export interface Poll {
    title: string;
    createdAt: Dayjs;
    maxVoteChoices: number;
    id: string;
    hasVoted: boolean;
    choices: PollChoice[];

    results: VoteResult[] | null;
    userVote: UserVote | null;
    maxVoteDate: Dayjs | null;
    showResultsDate: Dayjs | null;
}
