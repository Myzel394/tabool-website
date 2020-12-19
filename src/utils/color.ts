import {Instance as TinyColor} from "tinycolor2";

export const isLight = (value: TinyColor): boolean => value.getBrightness() / 255 > 0.8;
export const isDark = (value: TinyColor): boolean => value.getBrightness() / 255 < 0.2;
