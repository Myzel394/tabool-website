import {useContext, useMemo} from "react";
import dayjs from "dayjs";
import {getEndTime, getNextLessonDate, getStartTime, LessonDate} from "utils";

import SubmissionContext from "../SubmissionContext";

const useNextLessonDate = () => {
    const {
        lesson,
    } = useContext(SubmissionContext);

    const nextLesson = useMemo(() => {
        const {startHour, endHour, course: {weekdays}} = lesson;
        const startTime = dayjs(getStartTime(startHour));
        const endTime = dayjs(getEndTime(endHour));

        const lessonDates: LessonDate[] = weekdays.map(weekday => ({
            weekday,
            startTime,
            endTime,
        }));

        return getNextLessonDate(dayjs(), lessonDates);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lesson.startHour, lesson.endHour, lesson.course.weekdays, lesson.course.weekdays]);

    return nextLesson;
};

export default useNextLessonDate;
