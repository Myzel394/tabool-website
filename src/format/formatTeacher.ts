import {TeacherDetail} from "types";

const formatTeacher = (teacher: TeacherDetail): string => `${teacher.firstName} ${teacher.lastName} (${teacher.shortName})`;

export default formatTeacher;
