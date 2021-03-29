import {Dayjs} from "dayjs";

// eslint-disable-next-line import/no-cycle
import {UserPreferences} from "../contexts/UserContext";

export interface ServerPreference {
    data: UserPreferences;
}

export type AvailableLanguages = string;
export type AvailableThemes = "light" | "dark" | "blue" | "midnight" | "_system";
export type AvailableUpdatedAtTimeViews = "static" | "dynamic";

export interface Preferences {
    global?: {
        theme?: AvailableThemes;
        allowStatistics?: boolean;
        updatedAtTimeView?: AvailableUpdatedAtTimeViews;
        startPageMaxFutureDays?: number;
        language?: AvailableLanguages;
    };
    detailPage?: {
        ordering?: Record<string, string[]>;
        downloadedMaterials?: Record<string, Dayjs>;
    };
    timetable?: {
        showFreePeriods?: boolean;
        showDetails?: boolean;
    };
}
