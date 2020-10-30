import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {UserContext} from "contexts";

import {EmailVerificationFormManager} from "./EmailVerificationForm";

const EmailVerificationManager = () => {
    const {dispatch, state} = useContext(UserContext);
    const history = useHistory();

    return (
        <EmailVerificationFormManager
            onVerified={() => {
                dispatch({
                    type: "verify-email",
                    payload: {},
                });
                history.push("/auth/full-registration/");
            }}
        />
    );
};

export default EmailVerificationManager;
