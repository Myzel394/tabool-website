import React, {useContext} from "react";
import {IFillOutDataData, IFillOutDataResponse, useSendFillOutDataAPI} from "hooks/apis";
import {UserContext} from "contexts";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useHistory} from "react-router-dom";
import {generatePath} from "react-router";
import {FocusedPage} from "components";
import {useTranslation} from "react-i18next";

import Form from "./Form";

const FillOutData = () => {
    const {t} = useTranslation();
    const sendData = useSendFillOutDataAPI();
    const {dispatch} = useContext(UserContext);
    const history = useHistory();

    const {
        mutateAsync,
    } = useMutation<IFillOutDataResponse, AxiosError, IFillOutDataData>(
        sendData,
        {
            onSuccess: (data) => {
                dispatch({
                    type: "fill-out-data",
                    payload: data,
                });
                history.push(generatePath("/"));
            },
        },
    );

    return (
        <FocusedPage disableBackButton title={t("Registrierung abschließen")}>
            <Form
                onSubmit={(values, {setErrors, setSubmitting}) =>
                    mutateAsync(values)
                        .catch(error => setErrors(error.response?.data))
                        .finally(() => setSubmitting(false))
                }
            />
        </FocusedPage>
    );
};

export default FillOutData;
