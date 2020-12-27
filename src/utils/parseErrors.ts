const asArray = (value: string | string[]): string[] =>
    (Array.isArray(value) ? value : [value]);

const parseErrors = (
    givenErrors: Record<string, string | string[]>,
    nonFieldErrorsKeys: string[] = ["nonFieldErrors", "detail"],
    nonFieldErrorsKey = "nonFieldErrors",
): Record<string, string[]> =>
    Object
        .entries(givenErrors)
        .reduce<Record<string, string[]>>(
            (object, [key, value]) => {
                if (nonFieldErrorsKeys.includes(key)) {
                    object[nonFieldErrorsKey] = [
                        ...(object[nonFieldErrorsKey] ?? []),
                        ...asArray(value),
                    ];
                } else {
                    object[key] = [
                        ...(object[key] ?? []),
                        ...asArray(value),
                    ];
                }

                return object;
            }, {},
        );

export default parseErrors;
