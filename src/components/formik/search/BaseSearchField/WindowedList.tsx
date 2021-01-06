import React, {ReactNode, useRef} from "react";
import InfiniteLoader from "react-window-infinite-loader";
import {FixedSizeList} from "react-window";
import {useElementSize} from "hooks";
import AutoSizer from "react-virtualized-auto-sizer";

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
    const $element = useRef<any>();

    const [, elementSize] = useElementSize($element);

    // eslint-disable-next-line no-console
    console.log($element, elementSize);

    return (
        <AutoSizer>
            {({width, height}) =>
                <InfiniteLoader
                    isItemLoaded={index => !hasNextPage || index < elements.length}
                    loadMoreItems={isFetchingNextPage ? () => null : () => fetchNextPage()}
                    itemCount={elements.length}
                >
                    {({onItemsRendered, ref}) =>
                        <FixedSizeList
                            ref={ref}
                            itemCount={elements.length}
                            itemSize={elementSize ?? innerHeight}
                            width={width}
                            height={height}
                            onItemsRendered={onItemsRendered}
                        >
                            {({index, style}) =>
                                <div style={style}>
                                    <div ref={index === 0 ? $element : undefined} style={elementStyle}>
                                        {renderElement(elements[index], {
                                            isSelected: getKeyFromElement(elements[index]) === selectedKey,
                                            onClick: () => onElementSelect(elements[index]),
                                        })}
                                    </div>
                                </div>
                            }
                        </FixedSizeList>
                    }
                </InfiniteLoader>
            }
        </AutoSizer>
    );
};

WindowedList.defaultProps = {
    getKeyFromElement: element => element.id,
};

export default WindowedList;
