import React, {useContext, useEffect} from "react";
import {LoadingPage} from "components";
import {useTranslation} from "react-i18next";
import {useMutation} from "react-query";
import {useLogoutAPI} from "hooks/apis";
import {UserContext} from "contexts";
import {useHistory} from "react-router-dom";
import {buildPath} from "utils";

import {useTitle} from "../../hooks";


const Logout = () => {
    const {t} = useTranslation();
    const {dispatch} = useContext(UserContext);
    const history = useHistory();
    const logoutUser = useLogoutAPI();

    const {mutate} = useMutation(
        logoutUser,
        {
            onSuccess: () => {
                dispatch({
                    type: "logout",
                    payload: {},
                });
                history.push(buildPath("/"));
            },
            retry: 3,
        },
    );

    useEffect(() => {
        mutate();
    }, [mutate]);

    useTitle(t("Abmelden..."));

    return (
        <LoadingPage title={t("Du wirst abgemeldet")} />
    );
};

export default Logout;
