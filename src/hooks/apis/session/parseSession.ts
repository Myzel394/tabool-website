import {Session} from "types";
import {convertToDate} from "api";

const parseSession = async (session: Session): Promise<void> => {
    convertToDate(session, ["lastActivity"]);
};

export default parseSession;
