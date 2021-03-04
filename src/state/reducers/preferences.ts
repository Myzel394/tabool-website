import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {vivify} from "utils";
import {Preferences} from "types";
import update from "immutability-helper";

// eslint-disable-next-line import/no-cycle
import {RootState} from "../store";

export type AvailableThemes = "light" | "dark" | "blue" | "midnight";
export type AvailableUpdatedAtTimeViews = "static" | "dynamic";

interface IAddDetailPageOrdering {
    identifier: string;
    ordering: string[];
}

interface IAddDownloadedMaterialsDate {
    materialId: string;
    date: Date;
}

export const preferenceSlice = createSlice({
    name: "preference",
    initialState: {} as Preferences,
    reducers: {
        setRaw: (state: Preferences, {payload: data}: PayloadAction<Preferences>) => {
            // eslint-disable-next-line no-param-reassign
            state = data;
        },
        reset: (state: Preferences) => {
            // eslint-disable-next-line no-param-reassign
            state = {};
        },

        // Global
        setTheme: (state: Preferences, {payload: theme}: PayloadAction<AvailableThemes>) => {
            const vivifiedState = vivify(state);

            vivifiedState.global.theme = theme;
        },
        setAllowStatistics: (state: Preferences, {payload: allowStatistics}: PayloadAction<boolean>) => {
            const vivifiedState = vivify(state);

            vivifiedState.global.allowStatistics = allowStatistics;
        },
        setUpdatedAtTimeView: (state: Preferences, {payload: type}: PayloadAction<AvailableUpdatedAtTimeViews>) => {
            const vivifiedState = vivify(state);

            vivifiedState.global.updatedAtTimeView = type;
        },
        setStartPageMaxFutureDays: (state: Preferences, {payload: maxDays}: PayloadAction<number>) => {
            const vivifiedState = vivify(state);

            vivifiedState.global.startPageMaxFutureDays = maxDays;
        },

        // DetailPage
        addDetailPageOrdering: (state: Preferences, {
            payload: {
                identifier,
                ordering,
            },
        }: PayloadAction<IAddDetailPageOrdering>) => {
            const vivifiedState = vivify(state);

            vivifiedState.detailPage.ordering = update(vivifiedState.detailPage.ordering ?? {}, {
                [identifier]: {
                    $set: ordering,
                },
            });
        },
        addDownloadedMaterialsDate: (state: Preferences, {
            payload: {
                date,
                materialId,
            },
        }: PayloadAction<IAddDownloadedMaterialsDate>) => {
            const vivifiedState = vivify(state);

            vivifiedState.detailPage.downloadedMaterials = update(vivifiedState.detailPage.downloadedMaterials ?? {}, {
                [materialId]: {
                    $set: date ?? new Date(),
                },
            });
        },

        // Timetable
        setShowFreePeriod: (state: Preferences, {type: showFreePeriod}: PayloadAction<boolean>) => {
            const vivifiedState = vivify(state);

            vivifiedState.timetable.showFreePeriods = showFreePeriod;
        },
        setShowDetails: (state: Preferences, {type: showDetails}: PayloadAction<boolean>) => {
            const vivifiedState = vivify(state);

            vivifiedState.timetable.showDetails = showDetails;
        },
    },
});

export const getTheme = (state: RootState): AvailableThemes => state.preferences.global?.theme ?? "light";
export const getMaxFutureDays = (state: RootState): number => state.preferences.global?.startPageMaxFutureDays ?? 7;

export const {
    reset,
    setRaw,
    addDetailPageOrdering,
    addDownloadedMaterialsDate,
    setAllowStatistics,
    setShowDetails,
    setShowFreePeriod,
    setStartPageMaxFutureDays,
    setTheme,
    setUpdatedAtTimeView,
} = preferenceSlice.actions;

export default preferenceSlice.reducer;
