import {ExamDetail} from "types";

const formatExam = (exam: ExamDetail): string =>
    `${exam.course.subject.name}-Arbeit am ${exam.targetedDate.format("ll")}`;

export default formatExam;
