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
        availableKeys.reduce<RelationObject<AvailableKeys>>(
            (object, value) => {
                object[value] = array.includes(value);
                return object;
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            {},
        );
