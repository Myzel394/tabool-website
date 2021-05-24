import React, {ReactNode, useState} from "react";
import {UtilsContext} from "contexts";
import {useForceUpdate} from "@shopify/react-hooks";

export interface UtilsContextHandlerProps {
    children: ReactNode;
}

const UtilsContextHandler = ({children}: UtilsContextHandlerProps) => {
    const [bottomSheetHeight, setBottomSheetHeight] = useState<number>(0);
    const forceUpdate = useForceUpdate();

    return (
        <UtilsContext.Provider
            value={{
                bottomSheetHeight,
                _updateBottomSheetHeight: setBottomSheetHeight,
                _forceTopComponentUpdate: forceUpdate,
            }}
        >
            {children}
        </UtilsContext.Provider>
    );
};

export default UtilsContextHandler;
