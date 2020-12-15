/* eslint-disable @typescript-eslint/ban-ts-comment */
import _ from "lodash";

type RelationObject<AvailableKeys extends string = string> = {
    [key in AvailableKeys]: boolean;
};
type RelationArray = string[];

export const toArray = <AvailableKeys extends string = string>(
    object: RelationObject<AvailableKeys>,
): RelationArray =>
        Object.keys(_.pickBy(object, Boolean));

export const toObject = <AvailableKeys extends string = string>(
    array: RelationArray,
    availableKeys: string[],
): RelationObject<AvailableKeys> =>
        // @ts-ignore
        availableKeys.reduce<RelationObject<AvailableKeys>>(
            (object, value) => {
                object[value] = array.includes(value);
                return object;
            },
            // @ts-ignore
            {},
        );
