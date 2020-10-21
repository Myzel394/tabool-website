import React, {useState} from "react";

import FillOutDataFormManager from "./FillOutDataForm/FillOutDataFormManager";

const FillOutDataManager = () => {
    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    if (isRegistered) {
        return <p>Success</p>;
    }
    return <FillOutDataFormManager onFilledOut={() => null} />;
};

export default FillOutDataManager;
