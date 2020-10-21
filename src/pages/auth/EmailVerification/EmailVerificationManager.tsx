import React from "react";
import {useHistory} from "react-router-dom";

import {EmailVerificationFormManager} from "./EmailVerificationForm";

const EmailVerificationManager = () => {
    const history = useHistory();

    return (
        <EmailVerificationFormManager
            onVerified={() => history.push("/auth/full-registration/")}
        />
    );
};

export default EmailVerificationManager;
