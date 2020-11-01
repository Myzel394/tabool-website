import update from "immutability-helper";

export interface IFetchIdsToObject {
    [key: string]: (id: string) => any;
}


const fetchIdsToObject = async<T>(element: T, idsFuncMap: IFetchIdsToObject): Promise<T> => {
    const entries = Object.entries(idsFuncMap);

    const functions = entries.map(([name, func]) => func(element[name]));
    const fetchedValues = await Promise.all(functions);
    const updateObject: any = entries
        .map(([name, func], index) => ({
            key: name,
            value: {
                $set: fetchedValues[index],
            },
        }))
        .reduce((previous, current) => {
            previous[current.key] = current.value;
            return previous;
        }, {});

    return update<T>(element, updateObject);
};

export default fetchIdsToObject;
