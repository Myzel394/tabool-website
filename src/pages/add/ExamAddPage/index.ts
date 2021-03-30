import {withOnlyTeacher} from "hocs";

import Teacher from "./Teacher";

const ExamAddPage = withOnlyTeacher(Teacher);

export default ExamAddPage;
