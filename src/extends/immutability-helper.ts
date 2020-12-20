import {extend} from "immutability-helper";
import _ from "lodash";

// [keys, getIndexFromKey]
type Value<KeyType = string> = [KeyType[], (key: KeyType, array: any[]) => [number, number]];

extend<any[]>("$spliceDynamically", (value: Value, object: any[]) => {
    const newArray = _.cloneDeep(object);
    const [keys, getIndex] = value;

    keys.forEach(key => {
        let index;
        let deleteAmount = 1;
        const returnValue = getIndex(key, newArray);

        if (Array.isArray(returnValue)) {
            [index, deleteAmount] = returnValue;
        } else {
            index = returnValue;
        }

        newArray.splice(index, deleteAmount);
    });

    return newArray;
});
