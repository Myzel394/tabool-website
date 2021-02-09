import {CourseDetail} from "types";

const parseCourse = async (course: CourseDetail): Promise<void> => {
    course.shortName = course.subject.shortName + course.courseNumber;
    course.name = course.subject.name + course.courseNumber;
};

export default parseCourse;
