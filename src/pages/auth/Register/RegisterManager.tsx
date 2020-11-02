import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "contexts";
import {IFillOutDataResponse} from "hooks/apis/send/useSendFillOutDataAPI";

import {RegisterFormManager} from "./RegisterForm";
import Success from "./Success";

const RegisterManager = () => {
    const [data, setData] = useState<IFillOutDataResponse | undefined>();
    const {dispatch} = useContext(UserContext);

    // Login user
    useEffect(() => {
        if (data) {
            const {email, id} = data;

            dispatch({
                type: "register",
                payload: {
                    email,
                    id,
                },
            });
        }
    }, [data, dispatch]);

    if (data) {

        return <Success />;
    }
    return <RegisterFormManager
        onRegister={(data) => {
            setData(data);
        }} />;
};

export default RegisterManager;
