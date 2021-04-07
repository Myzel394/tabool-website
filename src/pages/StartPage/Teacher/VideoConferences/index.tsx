import React from "react";
import {TeacherClassbook} from "types";
import {useTranslation} from "react-i18next";
import {useTheme} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import FlipMove from "react-flip-move";
import {getPerUniqueValue} from "utils";

import Connector from "../../Connector";

import ConferenceList from "./ConferenceList";


export interface IVideoConferences {
    classbooks: TeacherClassbook[];
}

const VideoConferences = ({
    classbooks,
}: IVideoConferences) => {
    const {t} = useTranslation();
    const theme = useTheme();

    const classbooksPerCourse = getPerUniqueValue<TeacherClassbook>(classbooks, {
        getKey: classbook => classbook.lesson.course.id,
    });
    const length = Object.keys(classbooksPerCourse).length;

    if (!length) {
        return (
            <Alert severity="info">
                {t("Du hast keine Videokonferenzen in naher Zukunft.")}
            </Alert>
        );
    }

    return (
        <FlipMove enterAnimation="fade" leaveAnimation="none">
            {Object.entries(classbooksPerCourse).map(([courseId, classbooks], index) =>
                <>
                    <ConferenceList key={courseId} classbooks={classbooks} />
                    {index + 1 !== length && <Connector />}
                </>)}
        </FlipMove>
    );
};

export default VideoConferences;
