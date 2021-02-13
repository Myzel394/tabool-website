import {UserVote} from "types";
import {convertToDate} from "api";

const parseUserVote = async (userVote: UserVote) => {
    convertToDate(userVote, ["createdAt"]);
};

export default parseUserVote;
