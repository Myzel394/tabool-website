import React from "react";
import {useTranslation} from "react-i18next";
import {Typography} from "@material-ui/core";
import {FocusedPage} from "components";


const Completed = () => {
    const {t} = useTranslation();

    return (
        <FocusedPage disableBackButton title="Überprüfe deine E-Mail">
            <Typography variant="body1">
                {t("Überprüfe jetzt deine E-Mail. Dort geht's dann weiter!")}
            </Typography>
        </FocusedPage>
    );
};


export default Completed;
