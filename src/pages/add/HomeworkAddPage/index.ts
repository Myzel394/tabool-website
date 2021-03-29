import {withUserType} from "hocs";

import Student from "./Student";
import Teacher from "./Teacher";

const HomeworkAddPage = withUserType(Student, Teacher);

export default HomeworkAddPage;
