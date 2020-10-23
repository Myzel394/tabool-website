import React, {memo} from "react";

import LoginForm from "./LoginForm";

export interface ILoginFormManager {

}

const LoginFormManager = (props: ILoginFormManager) => {

    return (
        <LoginForm />
    );
};

export default memo(LoginFormManager);
