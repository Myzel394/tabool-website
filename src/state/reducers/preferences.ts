/* eslint-disable @typescript-eslint/ban-ts-comment */
import persistConfig from "constants/persistConfig";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Preferences} from "types";
import update from "immutability-helper";
import {persistReducer} from "redux-persist";


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
        setRaw: (state: Preferences, {payload: data}: PayloadAction<Preferences>) =>
            data,
        reset: (state: Preferences) => ({}),

        // Global
        setTheme: (state: Preferences, {payload: theme}: PayloadAction<AvailableThemes>) =>
            update(state, {
                global: {
                    // @ts-ignore
                    $auto: {
                        theme: {
                            $set: theme,
                        },
                    },
                },
            }),
        setAllowStatistics: (state: Preferences, {payload: allowStatistics}: PayloadAction<boolean>) =>
            update(state, {
                global: {
                    // @ts-ignore
                    $auto: {
                        allowStatistics: {
                            $set: allowStatistics,
                        },
                    },
                },
            }),
        setUpdatedAtTimeView: (state: Preferences, {payload: type}: PayloadAction<AvailableUpdatedAtTimeViews>) =>
            update(state, {
                global: {
                    // @ts-ignore
                    $auto: {
                        updatedAtTimeView: {
                            $set: type,
                        },
                    },
                },
            }),
        setStartPageMaxFutureDays: (state: Preferences, {payload: maxDays}: PayloadAction<number>) =>
            update(state, {
                global: {
                    // @ts-ignore
                    $auto: {
                        startPageMaxFutureDays: {
                            $set: maxDays,
                        },
                    },
                },
            }),

        // DetailPage
        addDetailPageOrdering: (state: Preferences, {
            payload: {
                identifier,
                ordering,
            },
        }: PayloadAction<IAddDetailPageOrdering>) =>
            update(state, {
                detailPage: {
                    // @ts-ignore
                    $auto: {
                        ordering: {
                            // @ts-ignore
                            $auto: {
                                [identifier]: {
                                    $set: ordering,
                                },
                            },
                        },
                    },
                },
            }),
        addDownloadedMaterialsDate: (state: Preferences, {
            payload: {
                date,
                materialId,
            },
        }: PayloadAction<IAddDownloadedMaterialsDate>) =>
            update(state, {
                detailPage: {
                    // @ts-ignore
                    $auto: {
                        downloadedMaterials: {
                            // @ts-ignore
                            $auto: {
                                [materialId]: {
                                    $set: date ?? new Date(),
                                },
                            },
                        },
                    },
                },
            }),

        // Timetable
        setShowFreePeriod: (state: Preferences, {type: showFreePeriod}: PayloadAction<boolean>) =>
            update(state, {
                global: {
                    // @ts-ignore
                    $auto: {
                        showFreePeriods: {
                            $set: showFreePeriod,
                        },
                    },
                },
            }),
        setShowDetails: (state: Preferences, {type: showDetails}: PayloadAction<boolean>) =>
            update(state, {
                global: {
                    // @ts-ignore
                    $auto: {
                        showDetails: {
                            $set: showDetails,
                        },
                    },
                },
            }),
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

const reducer = preferenceSlice.reducer;
const persistedReducer = persistReducer(persistConfig, reducer);

export default persistedReducer;
