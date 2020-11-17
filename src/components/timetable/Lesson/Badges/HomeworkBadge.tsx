import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import {FaClipboardList} from "react-icons/all";

import LessonBadge from "../LessonBadge";

export interface IHomeworkBadge {
    count: number;
}

const HomeworkBadge = ({count}: IHomeworkBadge) => {
    const {t} = useTranslation();

    return (
        <LessonBadge
            description={t("{{count}} Hausaufgaben verfügbar", {
                count
            })}
            getIcon={props => <FaClipboardList {...props} />}
        />
    );
};

export default memo(HomeworkBadge);
