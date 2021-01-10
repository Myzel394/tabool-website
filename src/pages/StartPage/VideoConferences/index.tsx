import React, {memo, useContext} from "react";
import {LessonDetail} from "types";
import dayjs from "dayjs";
import FlipMove from "react-flip-move";
import {Zoom} from "react-reveal";
import {useTheme} from "@material-ui/core";

import StartPageContext from "../StartPageContext";

import ConferenceList from "./ConferenceList";
import Connector from "./Connector";

interface LessonsPerDate {
    [key: string]: LessonDetail[];
}

const VideoConferences = () => {
    const {
        dailyData: {
            videoConferenceLessons: lessons,
        },
    } = useContext(StartPageContext);
    const theme = useTheme();

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
        <FlipMove enterAnimation="fade" leaveAnimation="none">
            {Object.entries(lessonsPerDay).map(([dateStr, lessons], index) =>
                <Zoom key={dateStr} duration={theme.transitions.duration.enteringScreen}>
                    <>
                        <ConferenceList key={dateStr} lessons={lessons} date={dayjs(dateStr)} />
                        {index + 1 !== length && <Connector />}
                    </>
                </Zoom>)}
        </FlipMove>
    );
};

export default memo(VideoConferences);
