import {CourseApprox} from "types";

const parseCourseApprox = async (course: CourseApprox): Promise<void> => {
    course.name = course.subject.shortName + course.courseNumber;
};

export default parseCourseApprox;
