const createShort = (text: string, maxLength = 80, prefix = "..."): string => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength - prefix.length) + prefix;
    } else {
        return text;
    }
};

export default createShort;
