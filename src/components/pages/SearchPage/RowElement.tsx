import React, {CSSProperties, memo, ReactNode, useEffect, useRef} from "react";
import {useElementSize} from "hooks";

export interface IRowElement<DataType = any, ElementType = any> {
    data: DataType;
    index: number;
    style: CSSProperties;
    renderElement: ({
        data: DataType,
        index: number,
    }) => ElementType;
    setHeight: (height: number) => any;
    useFooter: boolean;
    footer?: ReactNode;
}

const RowElement = <DataType extends any = any, ElementType = any>({
    data,
    index,
    setHeight,
    renderElement,
    style,
    useFooter,
    footer,
}: IRowElement<DataType, ElementType>) => {
    const $wrapper = useRef<any>();
    const [width, height] = useElementSize($wrapper);

    useEffect(() => {
        if (height) {
            setHeight(height);
        }
    }, [height, setHeight]);

    return (
        <div style={style}>
            <div ref={$wrapper}>
                {useFooter
                    ? footer
                    : renderElement({
                        data,
                        index,
                    })
                }
            </div>
        </div>
    );
};

export default memo(RowElement);
