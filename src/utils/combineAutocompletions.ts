import {AutocompleteType} from "types";

const combineAutocompletions = (list?: AutocompleteType[], predefined: string[] = []): string[] => {
    const uniqueValues = new Set([
        ...predefined.map(element => element.toLowerCase()),
        ...(list ?? []).map(element => element.text.toLowerCase()),
    ]);
    return Array.from(uniqueValues).map(element => element.charAt(0).toUpperCase() + element.slice(1));
};

export default combineAutocompletions;
