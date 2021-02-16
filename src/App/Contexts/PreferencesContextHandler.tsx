import React, {ReactNode, useCallback, useMemo, useState} from "react";
import {PreferencesContext} from "contexts";
import update from "immutability-helper";
import dayjs from "dayjs";
import _ from "lodash";

import {Preferences} from "../../types";


export interface IPreferencesContextHandler {
    children: ReactNode;
}


const KEY_NAME = "preferences";

const writePreferences = (preferences: Preferences): void => {
    localStorage.setItem(
        KEY_NAME,
        JSON.stringify(preferences),
    );
};

const readPreferences = (): Preferences => {
    const content = localStorage.getItem(KEY_NAME);

    if (typeof content === "string") {
        try {
            return JSON.parse(content);
            // eslint-disable-next-line no-empty
        } catch {
        }
    }

    return {};
};

const PreferencesContextHandler = ({
    children,
}: IPreferencesContextHandler) => {
    const [preference, setPreferences] = useState<Preferences>(readPreferences);

    const updatePreferences = useCallback((newPreferences: Preferences, justWrite = false) => {
        if (!justWrite) {
            setPreferences(newPreferences);
        }
        writePreferences(newPreferences);
    }, []);

    // global
    const setTheme = useCallback((theme: "light" | "dark" | "blue" | "midnight", justWrite = false) =>
        updatePreferences(update(preference, {
            global: {
                $apply: (value = {}) => ({
                    ...value,
                    theme,
                }),
            },
        }), justWrite)
    , [updatePreferences, preference]);
    const setAllowStatistics = useCallback((allowStatistics: boolean, justWrite = false) =>
        updatePreferences(update(preference, {
            global: {
                $apply: (value = {}) => ({
                    ...value,
                    allowStatistics,
                }),
            },
        }), justWrite)
    , [updatePreferences, preference]);
    const setUpdatedAtTimeView = useCallback((view: "static" | "dynamic", justWrite = false) =>
        updatePreferences(update(preference, {
            global: {
                $apply: (value = {}) => ({
                    ...value,
                    updatedAtTimeView: view,
                }),
            },
        }), justWrite)
    , [updatePreferences, preference]);
    const setStartPageMaxFutureDays = useCallback((date: number, justWrite = false) =>
        updatePreferences(update(preference, {
            global: {
                $apply: (value = {}) => ({
                    ...value,
                    startPageMaxFutureDays: date,
                }),
            },
        }), justWrite)
    , [updatePreferences, preference]);

    // detail page
    const addOrdering = useCallback((identifier: string, ordering: string[], justWrite = false) =>
        updatePreferences(update(preference, {
            detailPage: {
                $apply: (value = {}) => update(value, {
                    ordering: {
                        $apply: (value = {}) => ({
                            ...value,
                            [identifier]: ordering,
                        }),
                    },
                }),
            },
        }), justWrite)
    , [preference, updatePreferences]);
    const addDownloadedMaterialsDate = useCallback((materialId: string, justWrite = false) =>
        updatePreferences(update(preference, {
            detailPage: {
                $apply: (value = {}) => update(value, {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore: Dayjs is stored as string but passed as Dayjs instance
                    downloadedMaterials: {
                        $apply: (value = {}) => ({
                            ...value,
                            [materialId]: dayjs().toISOString(),
                        }),
                    },
                }),
            },
        }), justWrite)
    , [updatePreferences, preference]);

    // timetable
    const setShowFreePeriod = useCallback((showFreePeriods: boolean, justWrite = false) =>
        updatePreferences(update(preference, {
            timetable: {
                $apply: (value = {}) => ({
                    ...value,
                    showFreePeriods,
                }),
            },
        }), justWrite)
    , [updatePreferences, preference]);
    const setShowDetails = useCallback((showDetails: boolean, justWrite = false) =>
        updatePreferences(update(preference, {
            timetable: {
                $apply: (value = {}) => ({
                    ...value,
                    showDetails,
                }),
            },
        }), justWrite)
    , [updatePreferences, preference]);

    const preferenceState = useMemo(() => {
        const preferencesCopy = _.cloneDeep(preference);

        if (preferencesCopy?.detailPage?.downloadedMaterials) {
            preferencesCopy.detailPage.downloadedMaterials = Object
                .entries(preferencesCopy?.detailPage?.downloadedMaterials)
                .reduce((prev, [key, value]) => ({
                    ...prev,
                    [key]: dayjs(value),
                }), {});
        }

        return preferencesCopy;
    }, [preference]);

    return (
        <PreferencesContext.Provider
            value={{
                _writePreferences: writePreferences,
                _readPreferences: readPreferences,
                _rawUpdate: (preferences: Preferences) => updatePreferences(preferences),
                update: {
                    global: {
                        setTheme,
                        setAllowStatistics,
                        setUpdatedAtTimeView,
                        setStartPageMaxFutureDays,
                    },
                    detailPage: {
                        addOrdering,
                        addDownloadedMaterialsDate,
                    },
                    timetable: {
                        setShowFreePeriod,
                        setShowDetails,
                    },
                },
                state: preferenceState,
            }}
        >
            {children}
        </PreferencesContext.Provider>
    );
};
export default PreferencesContextHandler;


