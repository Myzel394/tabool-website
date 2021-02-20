import {TeacherCourseDetail} from "types";
import {convertToLocalWeekday} from "utils";

const parseTeacherCourseDetail = async (course: TeacherCourseDetail) => {
    course.weekdays = course.weekdays.map(convertToLocalWeekday);

    course.name = `${course.subject.name}${course.courseNumber}`;
    course.participantsCount = course.participants.length;
};

export default parseTeacherCourseDetail;
