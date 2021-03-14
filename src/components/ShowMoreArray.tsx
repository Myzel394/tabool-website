import React, {ReactNode, useState} from "react";
import {Collapse} from "@material-ui/core";


export interface IShowMoreArray<Element> {
    elements: Element[];
    maxElements: number;
    children: (element: Element) => ReactNode;

    renderButton: (isShown: boolean, update: () => void) => ReactNode;
}

const ShowMoreArray = <Element extends any>({
    children: render,
    elements,
    maxElements,
    renderButton,
}: IShowMoreArray<Element>) => {
    const [showMore, setShowMore] = useState<boolean>(false);

    const shownElements = elements.slice(0, maxElements);
    const hiddenElements = elements.slice(maxElements);

    const update = showMore ? () => setShowMore(false) : () => setShowMore(true);

    const hasMore = elements.length > maxElements;

    return (
        <>
            {shownElements.map(render)}
            {hasMore && (
                <Collapse in={showMore}>
                    <>
                        {hiddenElements.map(render)}
                    </>
                </Collapse>
            )}
            {hasMore && renderButton(showMore, update)}
        </>
    );
};
export default ShowMoreArray;
