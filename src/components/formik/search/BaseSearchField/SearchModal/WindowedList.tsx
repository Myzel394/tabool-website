import React, {useContext, useRef, useState} from "react";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList} from "react-window";
import {useElementSize} from "hooks";

import SearchFieldContext, {ISearchFieldContext} from "../SearchFieldContext";

export interface IWindowedList<KeyType> {
    selectedValue: KeyType | null;
    updateSelectedValue: (newKey: KeyType | null) => any;
}

const elementStyle = {
    height: "fit-content",
};

const WindowedList = <
    KeyType extends any = string
>({
        selectedValue,
        updateSelectedValue,
    }: IWindowedList<KeyType>) => {
    const {
        fetchNextPage,
        elements,
        hasNextPage,
        isFetching,
        renderElement,
        selectedKey: parentSelectedValue,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    } = useContext<ISearchFieldContext<DataType, KeyType>>(SearchFieldContext);

    const $container = useRef<any>();
    const [, containerHeight] = useElementSize($container.current);

    const [$element, $setElement] = useState<HTMLDivElement>();
    const [, elementHeight] = useElementSize($element);

    // Get height
    if (elementHeight === undefined || elementHeight === 0) {
        return (
            <div
                ref={reference => {
                    if (reference) {
                        $setElement(reference);
                    }
                }}
                style={elementStyle}
            >
                {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
                <div>
                    {renderElement(elements[0], false, () => null, false)}
                </div>
            </div>
        );
    }

    return (
        <div ref={$container} style={{height: "100%"}}>
            <InfiniteLoader
                isItemLoaded={index => !hasNextPage || index < elements.length}
                loadMoreItems={() => (isFetching ? null : fetchNextPage())}
                itemCount={elements.length}
            >
                {({onItemsRendered, ref}) =>
                    <AutoSizer>
                        {({width}) =>
                            <FixedSizeList
                                ref={ref}
                                itemCount={elements.length}
                                itemSize={elementHeight}
                                width={width}
                                height={containerHeight || 0}
                                onItemsRendered={onItemsRendered}
                            >
                                {({index, style}) => {
                                    const element = elements[index];
                                    const key = element._searchFieldKey;

                                    return (
                                        <div style={style}>
                                            {renderElement(
                                                element,
                                                key === selectedValue,
                                                () => updateSelectedValue(key),
                                                key === parentSelectedValue,
                                            )}
                                        </div>
                                    );
                                }}
                            </FixedSizeList>
                        }
                    </AutoSizer>
                }
            </InfiniteLoader>
        </div>
    );
};

export default WindowedList;
