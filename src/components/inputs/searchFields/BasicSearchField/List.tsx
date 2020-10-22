import React, {ReactNode, useCallback, useRef} from "react";
import {FixedSizeList} from "react-window";
import {useElementSize, useWindowSize} from "hooks";

export interface IList {
    data: any[];
    renderListElement: (element, props, isSelected: boolean) => ReactNode;
    itemSize: number;
    selectedKey: any;
    getKeyFromData: (data: any) => any;
    onSelect: (element) => void;
}

const List = ({data, renderListElement, itemSize, selectedKey, getKeyFromData, onSelect}: IList) => {
    const $wrapper = useRef<any>();

    const [bodyWidth] = useElementSize($wrapper);
    const [windowWidth, windowHeight] = useWindowSize();

    const renderRow = useCallback(({index, style}) => {
        const element = data[index];
        const isSelected = selectedKey === getKeyFromData(element);

        return renderListElement(
            element,
            {
                style,
                onClick: () => {
                    if (isSelected) {
                        onSelect(undefined);
                    } else {
                        onSelect(element);
                    }
                },
            },
            isSelected,
        );
    }, [renderListElement, data, selectedKey]);

    return (
        <div ref={$wrapper}>
            <FixedSizeList
                width={(bodyWidth || windowWidth || 0)}
                height={(windowHeight || 0) * 0.5}
                itemCount={data.length}
                itemSize={itemSize}
            >
                {renderRow}
            </FixedSizeList>
        </div>
    );
};

List.defaultProps = {
    itemSize: 46,
};

export default List;
