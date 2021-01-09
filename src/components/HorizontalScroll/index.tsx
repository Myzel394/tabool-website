import React, {ReactNode} from "react";
import {Grid} from "@material-ui/core";

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
    return (
        <Grid
            container
            spacing={5}
            direction="row"
            wrap="nowrap"
            className={styles.wrapper}
        >
            {elements.map(element =>
                <Grid key={getKey(element)} item>
                    {renderElement(element)}
                </Grid>)}
        </Grid>
    );
};

HorizontalScroll.defaultProps = {
    getKey: element => element.id,
};

export default HorizontalScroll;
