import React, {useContext} from "react";
import {FocusedPage} from "components";
import {useTranslation} from "react-i18next";
import {CircularProgress, Typography} from "@material-ui/core";
import {useMutation} from "react-query";
import {useLogoutAPI} from "hooks/apis";
import {UserContext} from "contexts";


const Logout = () => {
    const {t} = useTranslation();
    const {dispatch} = useContext(UserContext);
    const logoutUser = useLogoutAPI();

    useMutation(
        logoutUser,
        {
            onSuccess: () => dispatch({
                type: "logout",
                payload: {},
            }),
            retry: 3,
        },
    );

    return (
        <FocusedPage title={t("Abmelden")}>
            <CircularProgress />
            <Typography variant="body1" color="textSecondary">
                {t("Du wirst abgemeldet")}
            </Typography>
        </FocusedPage>
    );
};

export default Logout;
