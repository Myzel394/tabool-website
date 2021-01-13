import React from "react";
import {usePersistentStorage} from "hooks";
import {isChrome, isIOS} from "react-device-detect";

import IsIOS from "./IsIOS";
import IsChrome from "./IsChrome";


export interface IOhNoChecks {
    children: JSX.Element;
}

interface Checks {
    ios: boolean;
    notChrome: boolean;
}

const OhNoChecks = ({
    children,
}: IOhNoChecks) => {
    const [checks, setChecks] = usePersistentStorage<Checks>({
        ios: false,
        notChrome: false,
    }, "_checks");

    if (!isChrome && !checks.notChrome) {
        return (
            <IsChrome
                onClose={() => setChecks(prevState => ({
                    ...prevState,
                    notChrome: true,
                }))}
            />
        );
    }

    if (isIOS && !checks.ios) {
        return (
            <IsIOS
                onClose={() => setChecks(prevState => ({
                    ...prevState,
                    ios: true,
                }))}
            />
        );
    }

    return children;
};

export default OhNoChecks;
