import {Poll} from "types";
import {convertToDate} from "api";

const parsePoll = async (poll: Poll): Promise<void> => {
    convertToDate(poll, ["createdAt", "showResultsDate", "maxVoteDate", "userVote.createdAt"]);
    poll.hasVoted = Boolean(poll.userVote);
};

export default parsePoll;
