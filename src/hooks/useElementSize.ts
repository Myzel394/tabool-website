import {useEffect, useState} from "react";

const useElementSize = ($ref): [number | undefined, number | undefined] => {
    const [width, setWidth] = useState<number | undefined>();
    const [height, setHeight] = useState<number | undefined>();

    useEffect(() => {
        const element = $ref.current;
        const setSize = () => {
            const {clientWidth, clientHeight} = element;

            setWidth(clientWidth);
            setHeight(clientHeight);
        };

        if (element) {
            element.addEventListener("resize", setSize);
            setSize();
        }

        return () => element && element.removeEventListener("resize", setSize);
    }, [$ref.current]);

    return [width, height];
};

export default useElementSize;
