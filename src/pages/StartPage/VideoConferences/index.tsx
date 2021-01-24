import React, {memo} from "react";
import {LessonRelatedDetail} from "types";
import dayjs from "dayjs";
import FlipMove from "react-flip-move";
import {Zoom} from "react-reveal";
import {useTheme} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";

import ConferenceList from "./ConferenceList";
import Connector from "./Connector";

type LessonsPerDate = Record<string, LessonRelatedDetail[]>;

export interface IVideoConferences {
    lessons: LessonRelatedDetail[];
}

const VideoConferences = ({
    lessons,
}: IVideoConferences) => {
    const {t} = useTranslation();
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

    if (!lessons.length) {
        return (
            <Alert severity="info">
                {t("Du hast keine Videokonferenzen in naher Zukunft.")}
            </Alert>
        );
    }

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
