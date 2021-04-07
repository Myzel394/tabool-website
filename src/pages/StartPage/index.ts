import {withUserType} from "hocs";

import Student from "./Student";
import Teacher from "./Teacher";

const StartPage = withUserType(Student, Teacher);

export default StartPage;
