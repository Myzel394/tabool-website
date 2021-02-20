import {StudentCourseDetail} from "types";
import {convertToLocalWeekday} from "utils";

const parseStudentCourseDetail = async (course: StudentCourseDetail) => {
    course.weekdays = course.weekdays.map(convertToLocalWeekday);

    course.name = `${course.subject.name}${course.courseNumber}`;
};

export default parseStudentCourseDetail;
