const truncate = (text: string | null, maxLength = 80): string => {
    if (!text) {
        return "";
    }

    if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...`;
    }
    return text;
};

export default truncate;
