import {CourseDetail} from "types";

const parseCourse = (course: CourseDetail): void => {
    course.name = course.subject.shortName + course.courseNumber;
};

export default parseCourse;
