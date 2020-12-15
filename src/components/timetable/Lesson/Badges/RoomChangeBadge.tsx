import {useTranslation} from "react-i18next";
import {GiCardExchange} from "react-icons/all";
import React from "react";

import LessonBadge from "../LessonBadge";

const RoomChangeBadge = () => {
    const {t} = useTranslation();

    return (
        <LessonBadge
            description={t("Raumänderung")}
            getIcon={props => <GiCardExchange {...props} />}
        />
    );
};

export default RoomChangeBadge;
