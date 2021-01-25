import {AutocompleteType} from "types";

const getUniqueValues = (list: AutocompleteType[] = [], predefined: string[] = []): string[] =>
    Array.from(new Set([
        ...predefined.map(element => element.toLowerCase()),
        ...list.map(element => element.text.toLowerCase()),
    ]));

const capitalize = (text: string): string =>
    text.charAt(0).toUpperCase() + text.slice(1);

const combineAutocompletions = (list: AutocompleteType[] = [], predefined: string[] = []): string[] => {
    const uniqueValues = getUniqueValues(list, predefined);
    return uniqueValues.map(capitalize);
};

export default combineAutocompletions;
