const truncate = (text: string): string => {
    if (text.length > 80) {
        return `${text.substring(0, 80)}...`;
    }
    return text;
};

export default truncate;
