import React, {useContext} from "react";
import {useHistory} from "react-router";
import {UserContext} from "contexts";

import {FillOutDataFormManager} from "./FillOutDataForm";

const FillOutDataManager = () => {
    const history = useHistory();
    const {dispatch} = useContext(UserContext);

    return <FillOutDataFormManager
        onFilledOut={({
            firstName,
            lastName,
        }) => {
            dispatch({
                type: "fill-out-data",
                payload: {
                    firstName,
                    lastName,
                },
            });

            history.push("/");
        }} />;
};

export default FillOutDataManager;
