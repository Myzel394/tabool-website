import {CourseDetail} from "types";

const parseCourse = (course: CourseDetail): void => {
    course.shortName = course.subject.shortName + course.courseNumber;
    course.name = course.subject.name + course.courseNumber;
};

export default parseCourse;
