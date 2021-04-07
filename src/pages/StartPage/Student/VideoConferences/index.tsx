import React, {memo} from "react";
import {StudentClassbook, StudentLessonDetail} from "types";
import dayjs from "dayjs";
import FlipMove from "react-flip-move";
import {Zoom} from "react-reveal";
import {useTheme} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {getPerUniqueValue} from "utils";

import Connector from "../../Connector";

import ConferenceList from "./ConferenceList";

export interface IVideoConferences {
    classbooks: StudentClassbook[];
}

const VideoConferences = ({
    classbooks,
}: IVideoConferences) => {
    const {t} = useTranslation();
    const theme = useTheme();

    const lessonsPerDate = getPerUniqueValue<StudentClassbook, StudentLessonDetail>(classbooks, {
        getValue: classbook => classbook.lesson,
        getKey: classbook => classbook.lessonDate.toISOString(),
    });
    const length = Object.keys(lessonsPerDate).length;

    if (!length) {
        return (
            <Alert severity="info">
                {t("Du hast keine Videokonferenzen in naher Zukunft.")}
            </Alert>
        );
    }

    return (
        <FlipMove enterAnimation="fade" leaveAnimation="none">
            {Object.entries(lessonsPerDate).map(([dateStr, lessons], index) =>
                <Zoom key={dateStr} mountOnEnter duration={theme.transitions.duration.enteringScreen}>
                    <>
                        <ConferenceList key={dateStr} lessons={lessons} date={dayjs(dateStr)} />
                        {index + 1 !== length && <Connector />}
                    </>
                </Zoom>)}
        </FlipMove>
    );
};

export default memo(VideoConferences);
