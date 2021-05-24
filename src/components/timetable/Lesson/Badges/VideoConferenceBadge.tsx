import React from "react";
import {useTranslation} from "react-i18next";
import {FaVideo} from "react-icons/all";

import LessonBadge from "../LessonBadge";

export interface VideoConferenceBadgeProps {
    isActive?: boolean;
}

const VideoConferenceBadge = ({isActive}: VideoConferenceBadgeProps) => {
    const {t} = useTranslation();

    return (
        <LessonBadge
            description={isActive ? t("Video-Konferenz ist gerade aktiv!") : t("Video-Konferenz")}
            getIcon={props =>
                <FaVideo {...props} />
            }
        />
    );
};

export default VideoConferenceBadge;
