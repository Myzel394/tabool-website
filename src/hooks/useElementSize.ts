import {useLayoutEffect, useState} from "react";

const useElementSize = (reference): [number | undefined, number | undefined] => {
    const [width, setWidth] = useState<number | undefined>();
    const [height, setHeight] = useState<number | undefined>();

    useLayoutEffect(() => {
        const setSize = () => {
            const elementReal = reference?.current ?? reference;

            if (elementReal) {
                const {clientWidth, clientHeight} = elementReal;

                setWidth(clientWidth);
                setHeight(clientHeight);
            }
        };

        window.addEventListener("resize", setSize);

        setSize();

        return () => window.removeEventListener("resize", setSize);
    }, [reference]);

    return [width, height];
};

export default useElementSize;
