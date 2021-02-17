const truncate = (text: string): string => {
    if (text.length > 80) {
        return `${text}...`;
    }
    return text;
};

export default truncate;
