import React, {useContext, useState} from "react";
import {UserContext} from "contexts";
import {ISendRegistrationResponse} from "api/auth/sendRegistration";

import {RegisterFormManager} from "./RegisterForm";
import Success from "./Success";

const RegisterManager = () => {
    const [data, setData] = useState<ISendRegistrationResponse | undefined>();
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

        console.log("asd");

        return <Success />;
    }
    return <RegisterFormManager
        onRegister={(data) => {
            setData(data);
        }} />;
};

export default RegisterManager;
