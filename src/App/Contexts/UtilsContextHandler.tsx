import React, {memo, ReactNode} from "react";
import {UtilsContext} from "contexts";
import {IUtilsContext} from "contexts/UtilsContext";

export interface IUtilsContextHandler {
    children: ReactNode;
    activeTheme: IUtilsContext["activeTheme"];
    setActiveTheme: IUtilsContext["setActiveTheme"];

    bottomSheetHeight?: number;
}

const UtilsContextHandler = ({bottomSheetHeight, setActiveTheme, activeTheme, children}: IUtilsContextHandler) => {
    return (
        <UtilsContext.Provider
            value={{
                bottomSheetHeight,
                setActiveTheme,
                activeTheme,
            }}
        >
            {children}
        </UtilsContext.Provider>
    );
};

export default memo(UtilsContextHandler);
