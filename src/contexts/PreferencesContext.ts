import {createContext} from "react";

import {Preferences} from "../types";


export interface IPreferences {
    _writePreferences: (preferences: Preferences) => void;
    _readPreferences: () => Preferences;
    _rawUpdate: (preferences: Preferences) => void;
    update: {
        global: {
            setTheme: (theme: "light" | "dark" | "blue" | "midnight") => void;
            setAllowStatistics: (allowStatistics: boolean) => void;
            setUpdatedAtTimeView: (view: "static" | "dynamic") => void;
            setStartPageMaxFutureDays: (date: number) => void;
        };

        detailPage: {
            addOrdering: (identifier: string, ordering: string[]) => void;
            addDownloadedMaterialsDate: (materialId: string) => void;
        };

        timetable: {
            setShowFreePeriod: (showFreePeriod: boolean) => void;
            setShowDetails: (showDetails: boolean) => void;
        };
    };
    state: Preferences;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const initialPreferencesState: IPreferences = {};

const PreferencesContext = createContext<IPreferences>(initialPreferencesState);

export default PreferencesContext;
