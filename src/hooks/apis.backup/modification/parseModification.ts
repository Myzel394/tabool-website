import {convertToDate} from "api";
import {ModificationDetail} from "types";

const parseModification = async (modification: ModificationDetail): Promise<void> => {
    convertToDate(modification, ["startDatetime", "endDatetime"]);
    const lesson = await import("../lesson");
    await lesson.parseLessonRelatedDetail(modification.lesson);
};

export default parseModification;
