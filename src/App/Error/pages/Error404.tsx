import React, {memo} from "react";
import {GrDocumentMissing} from "react-icons/all";
import {useTranslation} from "react-i18next";

import BasePage from "./BasePage";


export interface IError404 {
    title?: string;
}


const Error404 = ({
    title,
}: IError404) => {
    const {t} = useTranslation();

    return (
        <BasePage title={title ?? t("Nicht gefunden")}>
            <GrDocumentMissing size="2rem" />
        </BasePage>
    );
};

export default memo(Error404);
