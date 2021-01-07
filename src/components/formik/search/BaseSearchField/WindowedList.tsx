import React, {ReactNode, useLayoutEffect, useRef, useState} from "react";
import {FixedSizeList} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";

import {RenderElement} from "./SelectModal";


export interface RenderDataElement {
    isSelected: boolean;
    onClick: () => void;
}

export interface IWindowedList<DataType, KeyType extends string = string> {
    hasNextPage: boolean;
    fetchNextPage: () => Promise<any>;
    isFetchingNextPage: boolean;

    elements: DataType[];
    onElementSelect: RenderElement<DataType, KeyType>["onElementSelect"];
    getKeyFromElement: (element: DataType) => KeyType;
    selectedKey: KeyType | null;

    children: (element: DataType, data: RenderDataElement) => ReactNode;
}

const elementStyle = {
    height: "fit-content",
};

const {
    innerHeight,
} = window;

const WindowedList = <DataType extends any = any, KeyType extends string = string>({
    elements,
    fetchNextPage,
    hasNextPage,
    onElementSelect,
    isFetchingNextPage,
    getKeyFromElement,
    selectedKey,
    children: renderElement,
}: IWindowedList<DataType, KeyType>) => {
    const $element = useRef<HTMLDivElement | null>(null);
    const [elementHeight, setElementHeight] = useState<number>();

    useLayoutEffect(() => {
        if (!elementHeight && $element.current?.clientHeight) {
            setElementHeight($element.current.clientHeight);
        }
    }, [$element, elementHeight]);

    if (elementHeight === undefined) {
        return (
            <div ref={$element}>
                {renderElement(elements[0], {
                    isSelected: getKeyFromElement(elements[0]) === selectedKey,
                    onClick: () => onElementSelect(elements[0]),
                })}
            </div>
        );
    }

    return (
        <InfiniteLoader
            isItemLoaded={index => !hasNextPage || index < elements.length}
            loadMoreItems={isFetchingNextPage ? () => null : () => fetchNextPage()}
            itemCount={elements.length}
        >
            {({onItemsRendered, ref}) =>
                <AutoSizer>
                    {({width, height}) =>
                        <FixedSizeList
                            ref={ref}
                            itemCount={elements.length}
                            itemSize={elementHeight}
                            width={width}
                            height={height}
                            onItemsRendered={onItemsRendered}
                        >
                            {({index, style}) =>
                                <div style={style}>
                                    <div style={elementStyle}>
                                        {renderElement(elements[index], {
                                            isSelected: getKeyFromElement(elements[index]) === selectedKey,
                                            onClick: () => onElementSelect(elements[index]),
                                        })}
                                    </div>
                                </div>
                            }
                        </FixedSizeList>
                    }
                </AutoSizer>
            }
        </InfiniteLoader>
    );
};

WindowedList.defaultProps = {
    getKeyFromElement: element => element.id,
};

export default WindowedList;
