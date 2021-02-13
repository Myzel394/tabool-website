import {Poll} from "types";
import {convertToDate} from "api";

import parseUserVote from "./parseUserVote";

const parsePoll = async (poll: Poll) => {
    convertToDate(poll, ["createdAt", "maxVoteDate", "showResultsDate"]);

    if (poll.userVote) {
        await parseUserVote(poll.userVote);
    }
};

export default parsePoll;
