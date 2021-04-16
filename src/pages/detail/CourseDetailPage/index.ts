import {withUserType} from "hocs";

import Student from "./Student";
import Teacher from "./Teacher";

const CourseDetailPage = withUserType(Student, Teacher);

export default CourseDetailPage;
