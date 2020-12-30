/* eslint-disable @typescript-eslint/ban-ts-comment */
import _ from "lodash";

export const toArray = <AvailableKeys extends string>(
    object: Record<AvailableKeys, boolean>,
): AvailableKeys[] =>
        // @ts-ignore
        Object.keys(_.pickBy(object, Boolean));

export const toObject = <AvailableKeys extends string>(
    array: string[],
    availableKeys: AvailableKeys[],
): Record<AvailableKeys, boolean> =>
        availableKeys
            .reduce<Record<AvailableKeys, boolean>>(
                (object, value) => ({
                    ...object,
                    [value]: array.includes(value),
                }),
            {} as Record<AvailableKeys, boolean>,
            );
