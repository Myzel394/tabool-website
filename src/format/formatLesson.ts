import {combineDatetime} from "../utils";

const formatLesson = (lesson) => {
    const courseName = lesson.course.name;
    const startDatetime = combineDatetime(lesson.date, lesson.startTime);
    const endDatetime = combineDatetime(lesson.date, lesson.endTime);

    return `${courseName}: ${startDatetime.format("LT")} - ${endDatetime.format("lll")}`;
};

export default formatLesson;
