import {TeacherCourseDetail} from "types";

const parseTeacherCourseDetail = async (course: TeacherCourseDetail) => {
    course.name = `${course.subject.name}${course.courseNumber}`;
    course.participantsCount = course.participants.length;
};

export default parseTeacherCourseDetail;
