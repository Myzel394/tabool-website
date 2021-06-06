import React from "react";
import {useTranslation} from "react-i18next";
import {ExamIcon} from "mappings";

import LessonBadge from "../LessonBadge";

const ExamBadge = () => {
    const {t} = useTranslation();

    return (
        <LessonBadge
            description={t("Du schreibst eine Arbeit in dieser Stunde")}
            getIcon={props =>
                <ExamIcon {...props} />
            }
        />
    );
};

export default ExamBadge;
