import React, {useContext, useState} from "react";
import {UserContext} from "contexts";
import {ISendFillOutDataResponse} from "hooks/apis/auth/useSendFillOutDataAPI";

import {RegisterFormManager} from "./RegisterForm";
import Success from "./Success";

const RegisterManager = () => {
    const [data, setData] = useState<ISendFillOutDataResponse | undefined>();
    const {dispatch} = useContext(UserContext);

    if (data) {
        const {email, id} = data;

        dispatch({
            type: "register",
            payload: {
                email,
                id,
            },
        });

        return <Success />;
    }
    return <RegisterFormManager
        onRegister={(data) => {
            setData(data);
        }} />;
};

export default RegisterManager;
