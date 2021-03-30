import {withUserType} from "hocs";

import Student from "./Student";
import Teacher from "./Teacher";

const AgendaPage = withUserType(Student, Teacher);

export default AgendaPage;
