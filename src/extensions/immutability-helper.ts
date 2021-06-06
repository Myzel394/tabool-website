import update, {extend} from "immutability-helper";

// [keys, getIndexFromKey]
type Value<KeyType = string> = [KeyType[], (key: KeyType, array) => [number, number]];

extend("$spliceDynamically", (value: Value, object) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newArray = [...object];
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

extend("$auto", (value, object) =>
    (object
        ? update(object, value)
        : update({}, value)));

extend("$autoArray", (value, object) =>
    (object
        ? update(object, value)
        : update([], value)));
