import {useTranslation} from "react-i18next";
import LessonBadge from "../LessonBadge";
import {GiCardExchange} from "react-icons/all";
import React from "react";

const RoomChangeBadge = () => {
    const {t} = useTranslation();

    return (
        <LessonBadge description={t("Raumänderung")} getIcon={props => <GiCardExchange {...props} />} />
    );
}

export default RoomChangeBadge;
