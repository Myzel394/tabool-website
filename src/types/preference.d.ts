import {Dayjs} from "dayjs";

// eslint-disable-next-line import/no-cycle
import {UserPreferences} from "../contexts/UserContext";

export interface ServerPreference {
    data: UserPreferences;
}

export interface Preferences {
    global?: {
        theme?: "light" | "dark" | "blue" | "midnight";
        allowStatistics?: boolean;
        updatedAtTimeView?: string;
        startPageMaxFutureDays?: number;
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
