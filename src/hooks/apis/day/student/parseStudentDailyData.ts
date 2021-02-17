import {StudentDailyDataView} from "types";

import {parseEventDetail} from "../../event";
import {parseStudentExamDetail} from "../../exam";
import {parseStudentLessonDetail} from "../../timetable";
import {parseStudentMaterialDetail} from "../../material";
import {parseStudentModificationDetail} from "../../modification";
import {parseStudentHomeworkDetail} from "../../homework";
import {parseStudentClassbookDetail} from "../../classbook";

const parseStudentDailyData = async (dailyData: StudentDailyDataView) => {
    await Promise.allSettled([
        ...dailyData.events.map(parseEventDetail),
        ...dailyData.exams.map(parseStudentExamDetail),
        ...dailyData.lessons.map(parseStudentLessonDetail),
        ...dailyData.materials.map(parseStudentMaterialDetail),
        ...dailyData.modifications.map(parseStudentModificationDetail),
        ...dailyData.homeworks.map(parseStudentHomeworkDetail),
        ...dailyData.classbookWithVideoConferences.map(parseStudentClassbookDetail),
    ]);
};

export default parseStudentDailyData;
