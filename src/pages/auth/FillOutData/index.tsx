import React from "react";
import {FocusedPage} from "components/pages";
import {useTranslation} from "react-i18next";

import FillOutDataManager from "./FillOutDataManager";

const FillOutData = () => {
    const {t} = useTranslation();

    return (
        <FocusedPage title={t("Registrierung abschließen")}>
            <FillOutDataManager />
        </FocusedPage>
    );
};

export default FillOutData;
