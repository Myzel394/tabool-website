import React, {memo} from "react";
import {SuccessMixin} from "components";
import {useTranslation} from "react-i18next";


const Completed = () => {
    const {t} = useTranslation();

    return (
        <SuccessMixin
            title={t("Super!")}
            description={t("Überprüfte jetzt deine E-Mail. Dort geht's dann weiter!")}
        />
    );
};

export default memo(Completed);
