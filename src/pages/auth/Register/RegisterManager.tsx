import React, {useState} from "react";

import {RegisterFormManager} from "./RegisterForm";
import Success from "./Success";

const RegisterManager = () => {
    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    if (isRegistered) {
        return <Success />;
    }
    return <RegisterFormManager
        onRegister={(data) => {
            setIsRegistered(true);
        }} />;
};

export default RegisterManager;
