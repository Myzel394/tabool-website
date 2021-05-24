import React, {memo, useMemo, useState} from "react";
import {Transition} from "react-transition-group";

export interface TransitionWrapperProps {
    children: (style: any) => JSX.Element;
    active: boolean;
    offsetAmount?: number;
}

const TRANSITION_DURATION = 150;

const TransitionWrapper = ({children: childrenFn, offsetAmount, active}: TransitionWrapperProps) => {
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
            in={active}
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
