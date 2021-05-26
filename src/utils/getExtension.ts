const getExtension = (filename: string): string => {
    const parts = filename.split(".");
    if (parts.length === 1 || (parts[0] === "" && parts.length === 2)) {
        return "";
    }
    return parts.pop() || "";
};

export default getExtension;
