import React, {memo, useContext, useMemo, useState} from "react";
import {Transition} from "react-transition-group";

import DetailContext from "../DetailContext";

export interface ITransitionWrapper {
    children: (style: any) => JSX.Element;
    offsetAmount?: number;
}

const TRANSITION_DURATION = 150;

const TransitionWrapper = ({children: childrenFn, offsetAmount}: ITransitionWrapper) => {
    const {enableReordering} = useContext(DetailContext);
    const [animationDuration, setAnimationDuration] = useState<number>(0);
    const transitionStyles = useMemo(() => ({
        entering: {
            transform: `translateX(${(offsetAmount ?? 0) + 1}px)`,
        },
        entered: {
            transform: `translateX(${(offsetAmount ?? 0) + 1}px)`,
        },
        exiting: {
            transform: "none",
        },
        exited: {
            transform: "none",
        },
    }), [offsetAmount]);
    const defaultStyle = useMemo(() => ({
        transition: `${animationDuration}ms`,
        willChange: "transform",
    }), [animationDuration]);

    return (
        <Transition
            in={enableReordering}
            timeout={animationDuration}
            onEnter={() => {
                if (animationDuration !== TRANSITION_DURATION) {
                    setAnimationDuration(TRANSITION_DURATION);
                }
            }}
        >
            {state => {
                const styles = {
                    ...defaultStyle,
                    ...transitionStyles[state],
                };

                return childrenFn(styles);
            }}
        </Transition>
    );
};

TransitionWrapper.defaultProps = {
    offsetAmount: 0,
};

export default memo(TransitionWrapper);
