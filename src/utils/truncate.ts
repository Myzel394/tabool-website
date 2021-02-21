const truncate = (text: string, maxLength = 80): string => {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...`;
    }
    return text;
};

export default truncate;
