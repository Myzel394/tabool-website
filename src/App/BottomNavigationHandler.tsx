import React, {useContext, useLayoutEffect, useState} from "react";
import {useElementSize} from "hooks";
import {UtilsContext} from "contexts";

import BottomNavigation from "./BottomNavigation";

const BottomNavigationHandler = () => {
    const {
        bottomSheetHeight,
        _updateBottomSheetHeight,
    } = useContext(UtilsContext);

    const [$bottom, $setBottom] = useState<any>();

    const [, bottomHeight] = useElementSize($bottom);
    console.log(bottomHeight);

    useLayoutEffect(() => {
        if (bottomHeight !== undefined && bottomHeight !== bottomSheetHeight) {
            _updateBottomSheetHeight(bottomHeight);
        }
    }, [bottomHeight, bottomSheetHeight, _updateBottomSheetHeight]);

    return (
        <>
            <div
                style={{
                    height: bottomHeight,
                }}
            />
            <BottomNavigation
                innerRef={$setBottom}
            />
        </>
    );
};

export default BottomNavigationHandler;
