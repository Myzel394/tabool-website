const stringifyPercent = (value: string | number): string => (typeof value === "string" ? value : `${value}%`);

const getDivStyles = (style: any) => {
    const {height, top, width, xOffset} = style;

    return {
        top: stringifyPercent(top),
        left: stringifyPercent(xOffset),
        width: stringifyPercent(width),
        height: stringifyPercent(height),
        position: "absolute" as "absolute",
    };
};

export default getDivStyles;
