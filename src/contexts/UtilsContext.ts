import {createContext} from "react";

export interface IUtilsContext {
    bottomSheetHeight?: number;
    _updateBottomSheetHeight: (value: number) => void;
    _forceTopComponentUpdate: () => void;
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const UtilsContext = createContext<IUtilsContext>();

export default UtilsContext;
