import tinycolor from "tinycolor2";

const createShadow = (color: string): string =>
    `0 0.2em 1em 0.4em ${tinycolor(color).setAlpha(0.3)}`;

export default createShadow;
