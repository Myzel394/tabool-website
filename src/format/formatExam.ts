const formatExam = (exam): string =>
    `${exam.course.subject.name}-Arbeit am ${exam.targetedDate.format("ll")}`;

export default formatExam;
