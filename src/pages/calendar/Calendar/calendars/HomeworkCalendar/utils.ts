import {Event as CalendarEvent} from "react-big-calendar";
import {HomeworkDetail} from "types";
import {combineDatetime} from "utils";

export const buildCalendarEvents = (homeworks: HomeworkDetail[]): CalendarEvent[] =>
    homeworks.map(homework => ({
        title: homework.lesson.lessonData.course.subject.name,
        start: combineDatetime(homework.lesson.date, homework.lesson.lessonData.startTime).toDate(),
        end: combineDatetime(homework.lesson.date, homework.lesson.lessonData.endTime).toDate(),
        resource: homework,
    }));
