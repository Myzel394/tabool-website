import {createContext} from "react";

export interface IUtilsContext {
    activeTheme: "dark" | "light";
    setActiveTheme: (newTheme: "dark" | "light") => any;

    bottomSheetHeight?: number;
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const UtilsContext = createContext<IUtilsContext>();

export default UtilsContext;
