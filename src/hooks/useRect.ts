// source: https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
import {useCallback, useLayoutEffect, useState} from "react";

interface RectResult {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
}

function getRect<T extends HTMLElement>(element?: T): RectResult {
    let rect: RectResult = {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
    };
    if (element) {
        rect = element.getBoundingClientRect();
    }
    return rect;
}

const useRect = <T extends HTMLElement>(
    element?: T,
): RectResult => {
    const [rect, setRect] = useState<RectResult>(() => getRect(element));

    const handleResize = useCallback(() => {
        if (!element) {
            return;
        }
        // Update client rect
        setRect(getRect(element));
    }, [element]);

    useLayoutEffect(() => {
        if (!element) {
            return;
        }

        handleResize();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (typeof window.ResizeObserver === "function") {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            let resizeObserver = new ResizeObserver(() => handleResize());
            resizeObserver.observe(element);
            return () => {
                if (!resizeObserver) {
                    return;
                }
                resizeObserver.disconnect();
                resizeObserver = null;
            };
        } else {
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [element, handleResize]);

    return rect;
};

export default useRect;
