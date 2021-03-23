import React, {ReactNode, useRef} from "react";
import {Grid} from "@material-ui/core";
import {useElementSize} from "hooks";

import styles from "./styles.module.scss";


export interface IHorizontalScroll<DataType> {
    children: (element: DataType) => ReactNode;
    elements: DataType[];
    getKey: (element: DataType) => string;
}

const HorizontalScroll = <DataType extends any>({
    children: renderElement,
    elements,
    getKey,
}: IHorizontalScroll<DataType>) => {
    const $element = useRef<any>();
    const [width = 0] = useElementSize($element);

    return (
        <Grid
            ref={$element}
            container
            spacing={5}
            direction="row"
            wrap="nowrap"
            className={styles.wrapper}
            alignItems="center"
        >
            {elements.map(element =>
                <Grid
                    key={getKey(element)}
                    item
                    xs={12}
                    style={{
                        width: width * 0.9 || "100%",
                        flexShrink: 0,
                    }}
                >
                    {renderElement(element)}
                </Grid>)}
        </Grid>
    );
};

HorizontalScroll.defaultProps = {
    getKey: element => element.id,
};

export default HorizontalScroll;
