import {CourseDetail} from "types";

const parseCourse = (course: CourseDetail): void => {
    course.name = course.subject.name + course.courseNumber;
};

export default parseCourse;
