import {CourseApprox} from "types";

const parseCourseApprox = async (course: CourseApprox) => {
    course.name = `${course.subject.name}${course.courseNumber}`;
};

export default parseCourseApprox;
