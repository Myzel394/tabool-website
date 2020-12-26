import React, {memo, ReactNode} from "react";
import {UtilsContext} from "contexts";

export interface IUtilsContextHandler {
    children: ReactNode;

    bottomSheetHeight?: number;
}

const UtilsContextHandler = ({bottomSheetHeight, children}: IUtilsContextHandler) => {
    return (
        <UtilsContext.Provider
            value={{
                bottomSheetHeight,
            }}
        >
            {children}
        </UtilsContext.Provider>
    );
};

export default memo(UtilsContextHandler);
