import {useCallback, useContext, useMemo} from "react";
import update from "immutability-helper";
import {UserPreferences} from "contexts/UserContext";
import {UserContext} from "contexts";
import dayjs from "dayjs";
import _ from "lodash";


export interface IUseUserPreferences {
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
    state: UserPreferences["data"];
}


const useUserPreferences = (): IUseUserPreferences => {
    const {
        dispatch,
        state,
    } = useContext(UserContext);

    const preference: UserPreferences["data"] = useMemo(() => state?.preference?.data ?? {}, [state?.preference?.data]);

    const updatePreferences = useCallback((newPreferences: UserPreferences["data"]) =>
        dispatch({
            type: "setPreferences",
            payload: {
                newPreferences,
            },
        })
    , [dispatch]);

    // global
    const setTheme = useCallback((theme: "light" | "dark" | "blue" | "midnight") =>
        updatePreferences(update(preference, {
            global: {
                $apply: (value = {}) => ({
                    ...value,
                    theme,
                }),
            },
        }))
    , [updatePreferences, preference]);
    const setAllowStatistics = useCallback((allowStatistics: boolean) =>
        updatePreferences(update(preference, {
            global: {
                $apply: (value = {}) => ({
                    ...value,
                    allowStatistics,
                }),
            },
        }))
    , [updatePreferences, preference]);
    const setUpdatedAtTimeView = useCallback((view: "static" | "dynamic") =>
        updatePreferences(update(preference, {
            global: {
                $apply: (value = {}) => ({
                    ...value,
                    updatedAtTimeView: view,
                }),
            },
        }))
    , [updatePreferences, preference]);
    const setStartPageMaxFutureDays = useCallback((date: number) =>
        updatePreferences(update(preference, {
            global: {
                $apply: (value = {}) => ({
                    ...value,
                    startPageMaxFutureDays: date,
                }),
            },
        }))
    , [updatePreferences, preference]);

    // detail page
    const addOrdering = useCallback((identifier: string, ordering: string[]) =>
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
        }))
    , [updatePreferences, preference]);
    const addDownloadedMaterialsDate = useCallback((materialId: string) =>
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
        }))
    , [updatePreferences, preference]);

    // timetable
    const setShowFreePeriod = useCallback((showFreePeriods: boolean) =>
        updatePreferences(update(preference, {
            timetable: {
                $apply: (value = {}) => ({
                    ...value,
                    showFreePeriods,
                }),
            },
        }))
    , [updatePreferences, preference]);
    const setShowDetails = useCallback((showDetails: boolean) =>
        updatePreferences(update(preference, {
            timetable: {
                $apply: (value = {}) => ({
                    ...value,
                    showDetails,
                }),
            },
        }))
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


    return {
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
    };
};

export default useUserPreferences;
