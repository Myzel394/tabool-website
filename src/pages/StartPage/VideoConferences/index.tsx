import React, {memo} from "react";
import {LessonDetail} from "types";
import {Box, Divider} from "@material-ui/core";
import dayjs from "dayjs";

import ConferenceList from "./ConferenceList";


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
    // eslint-disable-next-line no-console
    console.dir(lessonsPerDay);

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {Object.entries(lessonsPerDay).map(([dateStr, lessons]) =>
                <>
                    <Divider
                        orientation="vertical" style={{
                            height: 100,
                        }}
                    />
                    <ConferenceList key={dateStr} lessons={lessons} date={dayjs(dateStr)} />
                </>)}
        </Box>
    );
};

export default memo(VideoConferences);
