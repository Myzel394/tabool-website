import React, {ReactNode, useCallback} from "react";
import {FixedSizeList} from "react-window";

export interface IList {
    width: number;
    height: number;
    data: any[];
    renderListElement: (element, props) => ReactNode;
}

const List = ({width, height, data, renderListElement}: IList) => {
    const renderRow = useCallback(({index, style}) => {
        const element = data[index];

        return renderListElement(element, {style});
    }, [renderListElement, data]);

    return (
        <FixedSizeList
            width={width}
            height={height}
            itemCount={data.length}
            itemSize={50}
        >
            {renderRow}
        </FixedSizeList>
    );
};

export default List;
