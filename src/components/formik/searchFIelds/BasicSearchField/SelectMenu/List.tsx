import React, {ReactNode, useRef} from "react";
import {FixedSizeList} from "react-window";
import {useElementSize, useWindowSize} from "hooks";

export interface IList<DataType = any, KeyType = string> {
    data: DataType[];
    getKeyFromData: (data: DataType) => KeyType;

    renderListElement: (element: DataType, props, isSelected: boolean) => ReactNode;
    itemSize: number;

    selectedKey: KeyType;
    onSelect: (element: DataType | null) => void;
}

const List = <DataType extends any = any, KeyType = any>({
    data,
    renderListElement,
    itemSize,
    selectedKey,
    getKeyFromData,
    onSelect,
}: IList<DataType, KeyType>) => {
    const $wrapper = useRef<any>();

    const [bodyWidth] = useElementSize($wrapper);
    const [windowWidth, windowHeight] = useWindowSize();

    return (
        <div ref={$wrapper}>
            <FixedSizeList
                width={(bodyWidth || windowWidth || 0)}
                height={(windowHeight || 0) * 0.5}
                itemCount={data.length}
                itemSize={itemSize}
            >
                {({index, style}): any => {
                    const element = data[index];
                    const isSelected = selectedKey === getKeyFromData(element);

                    return renderListElement(
                        element,
                        {
                            style,
                            onClick: () => {
                                if (isSelected) {
                                    onSelect(null);
                                } else {
                                    onSelect(element);
                                }
                            },
                        },
                        isSelected,
                    );
                }}
            </FixedSizeList>
        </div>
    );
};

List.defaultProps = {
    itemSize: 46,
};

export default List;
