import {useCallback, useContext, useMemo} from "react";
import update from "immutability-helper";
import {IUser} from "contexts/UserContext";
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
    state: IUser["preferences"];
}


const useUserPreferences = (): IUseUserPreferences => {
    const {
        dispatch,
        state: {preferences},
    } = useContext(UserContext);


    const updatePreferences = useCallback((newPreferences: IUser["preferences"]) =>
        dispatch({
            type: "setPreferences",
            payload: {
                newPreferences,
            },
        })
    , [dispatch]);

    // global
    const setTheme = useCallback((theme: "light" | "dark" | "blue" | "midnight") =>
        updatePreferences(update(preferences ?? {}, {
            global: {
                $apply: (value = {}) => ({
                    ...value,
                    theme,
                }),
            },
        }))
    , [updatePreferences, preferences]);
    const setAllowStatistics = useCallback((allowStatistics: boolean) =>
        updatePreferences(update(preferences ?? {}, {
            global: {
                $apply: (value = {}) => ({
                    ...value,
                    allowStatistics,
                }),
            },
        }))
    , [updatePreferences, preferences]);
    const setUpdatedAtTimeView = useCallback((view: "static" | "dynamic") =>
        updatePreferences(update(preferences ?? {}, {
            global: {
                $apply: (value = {}) => ({
                    ...value,
                    updatedAtTimeView: view,
                }),
            },
        }))
    , [updatePreferences, preferences]);
    const setStartPageMaxFutureDays = useCallback((date: number) =>
        updatePreferences(update(preferences ?? {}, {
            global: {
                $apply: (value = {}) => ({
                    ...value,
                    startPageMaxFutureDays: date,
                }),
            },
        }))
    , [updatePreferences, preferences]);

    // detail page
    const addOrdering = useCallback((identifier: string, ordering: string[]) =>
        updatePreferences(update(preferences ?? {}, {
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
    , [updatePreferences, preferences]);
    const addDownloadedMaterialsDate = useCallback((materialId: string) =>
        updatePreferences(update(preferences ?? {}, {
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
    , [updatePreferences, preferences]);

    // timetable
    const setShowFreePeriod = useCallback((showFreePeriods: boolean) =>
        updatePreferences(update(preferences ?? {}, {
            timetable: {
                $apply: (value = {}) => ({
                    ...value,
                    showFreePeriods,
                }),
            },
        }))
    , [updatePreferences, preferences]);
    const setShowDetails = useCallback((showDetails: boolean) =>
        updatePreferences(update(preferences ?? {}, {
            timetable: {
                $apply: (value = {}) => ({
                    ...value,
                    showDetails,
                }),
            },
        }))
    , [updatePreferences, preferences]);

    const state = useMemo(() => {
        const preferencesCopy = _.cloneDeep(preferences);

        if (preferencesCopy?.detailPage?.downloadedMaterials) {
            preferencesCopy.detailPage.downloadedMaterials = Object
                .entries(preferencesCopy?.detailPage?.downloadedMaterials)
                .reduce((prev, [key, value]) => ({
                    ...prev,
                    [key]: dayjs(value),
                }), {});
        }

        return preferencesCopy;
    }, [preferences]);


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
        state,
    };
};

export default useUserPreferences;
