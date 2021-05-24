import React, {CSSProperties, ReactNode, useRef} from "react";
import {Grid} from "@material-ui/core";
import {useElementSize} from "hooks";


export interface IHorizontalScroll<DataType> {
    children: (element: DataType) => ReactNode;
    elements: DataType[];
    getKey: (element: DataType) => string;

    startElements?: JSX.Element[];
    endElements?: JSX.Element[];
}

const style = {
    width: "100%",
    margin: 0,
    overflowX: "scroll",
    scrollSnapType: "x mandatory",
} as CSSProperties;

const HorizontalScroll = <DataType extends any>({
    children: renderElement,
    elements,
    getKey,
    startElements,
    endElements,
}: IHorizontalScroll<DataType>) => {
    const $element = useRef<any>();
    const [width = 0] = useElementSize($element);
    const elementStyle = {
        scrollSnapAlign: "center",
        scrollSnapStop: "normal",
        width: width * 0.9 || "100%",
        height: "100%",
        flexShrink: 0,
    } as CSSProperties;
    const elementProps = {
        item: true,
        xs: 12 as 12,
        style: elementStyle,
    };

    return (
        <Grid
            ref={$element}
            container
            spacing={5}
            direction="row"
            wrap="nowrap"
            style={style}
            alignItems="center"
        >
            {startElements && startElements.map(element =>
                <Grid
                    key={element.key}
                    {...elementProps}
                >
                    {element}
                </Grid>)}
            {elements.map(element =>
                <Grid
                    key={getKey(element)}
                    {...elementProps}
                >
                    {renderElement(element)}
                </Grid>)}
            {endElements && endElements.map(element =>
                <Grid
                    key={element.key}
                    {...elementProps}
                >
                    {element}
                </Grid>)}
        </Grid>
    );
};

HorizontalScroll.defaultProps = {
    getKey: element => element.id,
};

export default HorizontalScroll;
