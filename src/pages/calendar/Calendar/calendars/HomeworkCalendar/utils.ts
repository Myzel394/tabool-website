import {Event as CalendarEvent} from "react-big-calendar";
import {HomeworkDetail} from "types";
import {combineDatetime} from "utils";

export const buildCalendarEvents = (homeworks: HomeworkDetail[]): CalendarEvent[] =>
    homeworks.map(homework => {
        return homework.lesson
            ? {
                title: homework?.lesson.course.subject.name,
                start: combineDatetime(homework.lesson.date, homework.lesson.startTime).toDate(),
                end: combineDatetime(homework.lesson.date, homework.lesson.endTime).toDate(),
                resource: homework,
            }
            : {};
    });
