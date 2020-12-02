import {useEffect, useState} from "react";

const useWindowSize = (): [number, number] => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);

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
    }, []);

    return [width, height];
};

export default useWindowSize;
