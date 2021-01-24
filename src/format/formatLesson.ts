import {LessonRelatedDetail} from "../types";
import {combineDatetime} from "../utils";

const formatLesson = (lesson: LessonRelatedDetail) => {
    const courseName = lesson.lessonData.course.name;
    const startDatetime = combineDatetime(lesson.date, lesson.lessonData.startTime);
    const endDatetime = combineDatetime(lesson.date, lesson.lessonData.endTime);

    return `${courseName}: ${startDatetime.format("LT")} - ${endDatetime.format("lll")}`;
};

export default formatLesson;
