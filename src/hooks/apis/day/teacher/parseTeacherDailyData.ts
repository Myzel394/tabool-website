import {TeacherDailyDataView} from "types";

import {parseTeacherLessonDetail} from "../../timetable";
import {parseTeacherModificationDetail} from "../../modification";
import {parseTeacherHomeworkDetail} from "../../homework";
import {parseTeacherSubmissionDetail} from "../../submission";
import {parseTeacherClassbookDetail} from "../../classbook";
import {parseTeacherMaterialDetail} from "../../material";
import {parseEventDetail} from "../../event";


const parseTeacherDailyData = async (dailyData: TeacherDailyDataView) => {
    await Promise.allSettled([
        ...dailyData.lessons.map(parseTeacherLessonDetail),
        ...dailyData.modifications.map(parseTeacherModificationDetail),
        ...dailyData.homeworks.map(parseTeacherHomeworkDetail),
        ...dailyData.submissions.map(parseTeacherSubmissionDetail),
        ...dailyData.classbookWithVideoConferences.map(parseTeacherClassbookDetail),
        ...dailyData.classbooksForLessons.map(parseTeacherClassbookDetail),
        ...dailyData.materials.map(parseTeacherMaterialDetail),
        ...dailyData.events.map(parseEventDetail),
    ]);
};

export default parseTeacherDailyData;
