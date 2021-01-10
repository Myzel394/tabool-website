import React, {memo} from "react";
import {LessonDetail} from "types";
import dayjs from "dayjs";

import ConferenceList from "./ConferenceList";
import Connector from "./Connector";


export interface IVideoConferences {
    lessons: LessonDetail[];
}

interface LessonsPerDate {
    [key: string]: LessonDetail[];
}

const VideoConferences = ({lessons}: IVideoConferences) => {
    const lessonsPerDay: LessonsPerDate = lessons.reduce<LessonsPerDate>((obj, lesson) => {
        const dateStr = lesson.date.toISOString();
        const array = obj[dateStr] ?? [];
        const idExists = array.some(givenLesson => givenLesson.id === lesson.id);

        if (!idExists) {
            array.push(lesson);
        }

        return {
            ...obj,
            [dateStr]: array,
        };
    }, {});
    const length = Object.keys(lessonsPerDay).length;

    return (
        <>
            {Object.entries(lessonsPerDay).map(([dateStr, lessons], index) =>
                <>
                    <ConferenceList key={dateStr} lessons={lessons} date={dayjs(dateStr)} />
                    {index + 1 !== length && <Connector />}
                </>)}
        </>
    );
};

export default memo(VideoConferences);
