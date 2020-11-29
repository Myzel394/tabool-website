import React, {ReactNode, useCallback, useEffect, useMemo, useRef, useState} from "react";
import BezierEasing from "bezier-easing";
import {Transition} from "react-transition-group";

import {useWindowSize} from "../../hooks";

import DefaultPullToRefreshObject from "./DefaultPullToRefreshElement";
import State from "./State";

export interface IPullToRefresh {
    children: ReactNode;
    onRefresh: () => any;
    isRefreshing: boolean;
    loadingElementHeight: number;

    // Props with default values
    minDragAmountForRefresh: number;
    maxOffset: number;
    getLoadingElement: (state: State) => JSX.Element;

    maxDragAmount?: number;
}

const easing = BezierEasing(0.2, 0.96, 0.49, 0.99);
const TRANSITION_DURATION = 200;

const PullToRefresh = ({
    children,
    maxDragAmount: givenMaxDragAmount,
    maxOffset,
    minDragAmountForRefresh,
    onRefresh,
    getLoadingElement,
    isRefreshing,
    loadingElementHeight,
}: IPullToRefresh) => {
    const $div = useRef<any>();
    const [windowWidth, windowHeight] = useWindowSize();

    const [scrollAmount, setScrollAmount] = useState<number>(0);
    const [startY, setStartY] = useState<number>(-1);
    const [dragAmount, setDragAmount] = useState<number>(0);
    const [endDragAmount, setEndDragAmount] = useState<number>(0);

    const maxDragAmount = givenMaxDragAmount ?? windowHeight;
    const isDragging = dragAmount > 0;
    const hasStarted = startY !== -1;
    const currentState: State = (() => {
        if (isRefreshing) {
            return "fetching";
        }
        if (dragAmount > minDragAmountForRefresh) {
            return "confirmed";
        }
        if (dragAmount > 0) {
            return "preview";
        }
        return "done";
    })();

    const style = useMemo(() => ({
        transition: isDragging ? "0s" : `${TRANSITION_DURATION}ms`,
        transform: `translateY(${Math.ceil(easing(dragAmount / maxDragAmount) * maxOffset)}px)`,
    }), [dragAmount, isDragging, maxDragAmount, maxOffset]);
    const transitionStyles = useMemo(() => ({
        enter: {
            transform: `translateY(${endDragAmount}px)`,
        },
        exiting: {
            transform: isRefreshing ? `translateY(${loadingElementHeight}px)` : "",
        },
        exited: {
            transform: isRefreshing ? `translateY(${loadingElementHeight}px)` : "",
        },
    }), [endDragAmount, isRefreshing, loadingElementHeight]);
    const handleTouchStart = useCallback(event => {
        if (scrollAmount === 0) {
            setStartY(event.changedTouches[0].clientY);
        }
    }, [scrollAmount]);
    const handleTouchMove = useCallback(event => {
        if (hasStarted) {
            const currentY = event.changedTouches[0].clientY;
            const diff = startY - currentY;

            setDragAmount(Math.min(maxDragAmount, -diff));
        }
    }, [hasStarted, maxDragAmount, startY]);
    const handleTouchEnd = useCallback(() => {
        if (hasStarted) {
            setDragAmount(0);
            setEndDragAmount(dragAmount);
            setStartY(-1);
            if (dragAmount > minDragAmountForRefresh) {
                onRefresh();
            }
        }
    }, [dragAmount, hasStarted, minDragAmountForRefresh, onRefresh]);

    useEffect(() => {
        const listener = () => {
            setScrollAmount(window.scrollY);
        };

        window.addEventListener("scroll", listener);

        return () => window.removeEventListener("scroll", listener);
    }, []);

    // Lock scroll
    useEffect(() => {
        if (isDragging) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isDragging]);

    return (
        <Transition
            in={isDragging}
            timeout={{
                exit: TRANSITION_DURATION,
                enter: 0,
                appear: 0,
            }}
        >
            {state => (
                <div
                    ref={$div}
                    style={{
                        ...style,
                        ...transitionStyles[state],
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        style={{
                            height: 0,
                            transform: `translateY(-${loadingElementHeight}px)`,
                        }}
                    >
                        {getLoadingElement(currentState)}
                    </div>
                    {children}
                </div>
            )
            }
        </Transition>
    );
};

PullToRefresh.defaultProps = {
    maxOffset: 100,
    minDragAmountForRefresh: 200,
    getLoadingElement: (state => <DefaultPullToRefreshObject state={state} />),
    loadingElementHeight: 80,
    autoMountLoadingElement: true,
};

export default PullToRefresh;
