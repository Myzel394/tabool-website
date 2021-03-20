import {
    EventDetail,
    StudentExamDetail,
    StudentHomeworkDetail,
    StudentLessonDetail,
    StudentMaterialDetail,
    StudentModificationDetail,
    StudentWeekView,
} from "types";
import {Dayjs} from "dayjs";
import {isDateEqual} from "utils";

async function filterTimetableForDay(timetable: StudentWeekView, selectedDate: null): Promise<null>;
async function filterTimetableForDay(timetable: StudentWeekView, selectedDate: Dayjs): Promise<StudentWeekView>;

async function filterTimetableForDay(
    timetable: StudentWeekView,
    selectedDate: Dayjs | null,
): Promise<StudentWeekView | null> {
    if (!selectedDate) {
        return null;
    }

    const filterLesson = (lesson: StudentLessonDetail) =>
        lesson.weekday === selectedDate.day();
    const filterModification = (modification: StudentModificationDetail) =>
        isDateEqual(modification.lessonDate, selectedDate);
    const filterHomework = (homework: StudentHomeworkDetail) =>
        isDateEqual(homework.lessonDate, selectedDate);
    const filterMaterial = (material: StudentMaterialDetail) =>
        isDateEqual(material.lessonDate, selectedDate);
    const filterExam = (exam: StudentExamDetail) =>
        isDateEqual(exam.date, selectedDate);
    const filterEvent = (event: EventDetail) =>
        isDateEqual(event.startDatetime, selectedDate) ||
        isDateEqual(event.endDatetime, selectedDate);

    const data = (await Promise.allSettled([
        (async () => timetable.lessons.filter(filterLesson))(),
        (async () => timetable.modifications.filter(filterModification))(),
        (async () => timetable.homeworks.filter(filterHomework))(),
        (async () => timetable.materials.filter(filterMaterial))(),
        (async () => timetable.exams.filter(filterExam))(),
        (async () => timetable.events.filter(filterEvent))(),
    ]));

    if (data.every(result => result.status !== "fulfilled")) {
        throw new Error();
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response = data.map(result => result.value);

    const [
        lessons,
        modifications,
        homeworks,
        materials,
        exams,
        events,
    ] = response;

    return {
        lessons,
        modifications,
        homeworks,
        materials,
        exams,
        events,
    };
}

export default filterTimetableForDay;
