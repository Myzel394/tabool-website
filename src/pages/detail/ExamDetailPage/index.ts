import {withUserType} from "hocs";

import Student from "./Student";
import Teacher from "./Teacher";

const ExamDetailPage = withUserType(Student, Teacher);

export default ExamDetailPage;
