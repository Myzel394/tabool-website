import {withUserType} from "hocs";

import Student from "./Student";
import Teacher from "./Teacher";

const LessonDetailPage = withUserType(Student, Teacher);

export default LessonDetailPage;
