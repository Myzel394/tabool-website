import React from "react";
import {usePersistentStorage} from "hooks";
import {isIOS} from "react-device-detect";

import IsIOS from "./IsIOS";


export interface OhNoChecksProps {
    children: JSX.Element;
}

interface Checks {
    ios: boolean;
}

const OhNoChecks = ({
    children,
}: OhNoChecksProps) => {
    const [checks, setChecks] = usePersistentStorage<Checks>({
        ios: false,
    }, "checks");

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
