import tinycolor from "tinycolor2";

import getAdaptedColor from "./getAdaptedColor";
import {isDark, isLight} from "./color";

const expectToBeLight = value => expect(isLight(tinycolor(value))).toEqual(true);
const expectToBeDark = value => expect(isDark(tinycolor(value))).toEqual(true);

describe("getAdaptedColor works in light mode with", () => {
    const type = "light";

    test("bright background and dark text", () => {
        const [textColor, backgroundColor] = getAdaptedColor({
            type,
            textColor: "#000",
            backgroundColor: "#fff",
        });

        expectToBeDark(textColor);
        expectToBeLight(backgroundColor);
    });
    test("bright background and bright text", () => {
        const [textColor, backgroundColor] = getAdaptedColor({
            type,
            textColor: "#fff",
            backgroundColor: "#fff",
        });

        expectToBeDark(textColor);
        expectToBeLight(backgroundColor);
    });
    test("dark background and bright text", () => {
        const [textColor, backgroundColor] = getAdaptedColor({
            type,
            textColor: "#fff",
            backgroundColor: "#000",
        });

        expectToBeLight(textColor);
        expectToBeDark(backgroundColor);
    });
    test("dark background and dark text", () => {
        const [textColor, backgroundColor] = getAdaptedColor({
            type,
            textColor: "#000",
            backgroundColor: "#000",
        });

        expectToBeLight(textColor);
        expectToBeDark(backgroundColor);
    });

    test("random test", () => {
        const [textColor, backgroundColor] = getAdaptedColor({
            textColor: "#1e67ff",
            backgroundColor: "#f0f0f0",
        });
    });
});

describe("getAdaptedColor works in dark mode with", () => {
    const type = "dark";

    test("bright background and dark text", () => {
        const [textColor, backgroundColor] = getAdaptedColor({
            type,
            textColor: "#000",
            backgroundColor: "#fff",
        });

        expectToBeDark(textColor);
        expectToBeLight(backgroundColor);
    });

    test("bright background and bright text", () => {
        const [textColor, backgroundColor] = getAdaptedColor({
            type,
            textColor: "#fff",
            backgroundColor: "#fff",
        });

        expectToBeLight(textColor);
        expectToBeLight(backgroundColor);
    });

    test("dark background and bright text", () => {
        const [textColor, backgroundColor] = getAdaptedColor({
            type,
            textColor: "#fff",
            backgroundColor: "#000",
        });

        expectToBeLight(textColor);
        expectToBeDark(backgroundColor);
    });

    test("dark background and dark text", () => {
        const [textColor, backgroundColor] = getAdaptedColor({
            type,
            textColor: "#000",
            backgroundColor: "#000",
        });

        expectToBeDark(textColor);
        expectToBeLight(backgroundColor);
    });
});
