import React, {useState} from "react";

import Success from "./Success";
import {EmailVerificationFormManager} from "./EmailVerificationForm";

const EmailVerificationManager = () => {
    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    if (isRegistered) {
        return <Success />;
    }
    return (
        <EmailVerificationFormManager
            onVerified={() => {
                setIsRegistered(true);
            }}
        />
    );
};

export default EmailVerificationManager;
