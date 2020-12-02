import {createContext} from "react";

interface IUtilsContext {
    bottomSheetHeight?: number;
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const UtilsContext = createContext<IUtilsContext>();

export default UtilsContext;
