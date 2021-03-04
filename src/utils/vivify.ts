/* eslint-disable @typescript-eslint/ban-ts-comment */

type AnyRecord = Record<string, any>;

const vivify = <T extends AnyRecord = AnyRecord>(
    // @ts-ignore
    initialState: T = {},
): Record<keyof T, T[keyof T] | any> => new Proxy<T>(
    initialState,
    {
        get: (target, name: keyof T) => {
            const value = target[name];

            if (value !== undefined && name in target) {
                if (value !== null && typeof value === "object") {
                    return vivify(value);
                }

                return value;
            } else {
                const obj = vivify();

                // @ts-ignore
                target[name] = obj;

                return obj;
            }
        },
    },
);

export default vivify;
