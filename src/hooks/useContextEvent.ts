import {useCallback, useEffect, useRef} from "react";

interface IUseContextEvent {
    onContextEvent: () => any;

    longPressThreshold?: number;
    onClick?: () => any;
}

interface Response {
    onTouchStart: () => any;
    onTouchEnd: () => any;
    onContextMenu: () => any;
}

const useContextEvent = ({
    longPressThreshold = 800,
    onContextEvent,
    onClick,
}: IUseContextEvent): Response => {
    const $timeout = useRef<any>();
    const onTouchStart = useCallback(() => {
        $timeout.current = setTimeout(() => {
            $timeout.current = null;
            onContextEvent();
        }, longPressThreshold);
    }, [longPressThreshold, onContextEvent]);
    const onTouchEnd = useCallback(() => {
        if ($timeout.current) {
            clearTimeout($timeout.current);
            onClick?.();
        }
    }, [onClick]);

    useEffect(() => {
        return () => {
            clearTimeout($timeout.current);
        };
    }, []);

    return {
        onTouchStart,
        onTouchEnd,
        onContextMenu: onContextEvent,
    };
};

export default useContextEvent;
