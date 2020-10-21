import {useEffect, useState} from "react";

const useWindowSize = (): [number | undefined, number | undefined] => {
    const [width, setWidth] = useState<number | undefined>();
    const [height, setHeight] = useState<number | undefined>();

    useEffect(() => {
        const setSize = () => {
            const {innerWidth, innerHeight} = window;

            setWidth(innerWidth);
            setHeight(innerHeight);
        };

        window.addEventListener("resize", setSize);

        // Init
        setSize();

        return () => window.removeEventListener("resize", setSize);
    });

    return [width, height];
};

export default useWindowSize;
