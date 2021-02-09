import {StudentCourseDetail} from "types";

const parseStudentCourseDetail = async (course: StudentCourseDetail) => {
    course.name = `${course.subject.name}${course.courseNumber}`;
};

export default parseStudentCourseDetail;
