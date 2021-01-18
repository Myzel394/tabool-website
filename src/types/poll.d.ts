import {Dayjs} from "dayjs";

export interface Choice {
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
    choices: Choice[];
    results: VoteResult[];
    userVote: UserVote;

    maxVoteDate: Dayjs | null;
    showResultsDate: Dayjs | null;
}
