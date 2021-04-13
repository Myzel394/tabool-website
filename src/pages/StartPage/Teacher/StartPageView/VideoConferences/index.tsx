import React, {useContext} from "react";
import {TeacherClassbook} from "types";
import {useTranslation} from "react-i18next";
import {Alert} from "@material-ui/lab";
import FlipMove from "react-flip-move";
import {getPerUniqueValue} from "utils";

import Connector from "../../../Connector";
import StartPageContext from "../../StartPageContext";

import ConferenceList from "./ConferenceList";

const VideoConferences = () => {
    const {
        dailyData: {classbookWithVideoConferences: classbooks},
    } = useContext(StartPageContext);
    const {t} = useTranslation();

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
