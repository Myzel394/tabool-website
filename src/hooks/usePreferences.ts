import {useContext} from "react";
import {PreferencesContext} from "contexts";

import {IPreferences} from "../contexts/PreferencesContext";

const usePreferences = (): IPreferences => {
    return useContext(PreferencesContext);
};

export default usePreferences;
