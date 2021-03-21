/* eslint-disable @typescript-eslint/ban-ts-comment */
import persistConfig from "constants/persistConfig";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Preferences} from "types";
import update from "immutability-helper";
import {persistReducer} from "redux-persist";
import dayjs, {Dayjs} from "dayjs";

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
    date?: Date;
}

export const preferenceSlice = createSlice({
    name: "preference",
    initialState: {} as Preferences,
    reducers: {
        setRaw: (state, {payload: data}: PayloadAction<Preferences>) =>
            data,
        reset: () => ({}),

        // Global
        setTheme: (state, {payload: theme}: PayloadAction<AvailableThemes>) =>
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
        setAllowStatistics: (state, {payload: allowStatistics}: PayloadAction<boolean>) =>
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
        setUpdatedAtTimeView: (state, {payload: type}: PayloadAction<AvailableUpdatedAtTimeViews>) =>
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
        setStartPageMaxFutureDays: (state, {payload: maxDays}: PayloadAction<number>) =>
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
        addDetailPageOrdering: (state, {
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
        addDownloadedMaterialsDate: (state, {
            payload: {
                materialId,
                date,
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
                                    $set: (date ?? new Date()).toISOString(),
                                },
                            },
                        },
                    },
                },
            }),

        // Timetable
        setShowFreePeriod: (state, {payload: showFreePeriod}: PayloadAction<boolean>) =>
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
        setShowDetails: (state, {payload: showDetails}: PayloadAction<boolean>) =>
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
export const getMaterialDownloadDate = (materialId: string): ((state: RootState) => Dayjs | null) =>
    (state: RootState) => {
        const value = state.preferences.detailPage?.downloadedMaterials?.[materialId];

        return value ? dayjs(value) : null;
    };

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
