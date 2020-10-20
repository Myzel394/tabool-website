import React from "react";
import {useTranslation} from "react-i18next";
import {SuccessMixin} from "components/mixins";

const Success = () => {
    const {t} = useTranslation();

    return (
        <SuccessMixin
            title={t("Super!")}
            description={t("Überprüfte jetzt deine E-Mail. Dort geht's dann weiter!")}
        />
    );
};

export default Success;
