import {CourseApprox} from "types";

const parseCourseApprox = async (course: CourseApprox): Promise<void> => {
    course.shortName = course.subject.shortName + course.courseNumber;
    course.name = course.subject.name + course.courseNumber;
};

export default parseCourseApprox;
