import React, {CSSProperties, useEffect, useRef, useState} from "react";
import {useForceUpdate} from "@shopify/react-hooks";
import {useTheme} from "@material-ui/core";


export interface ICircle {
    color: string;
    fillPercentage: number;
    offsetPercentage: number;
}

const createStyles = (
    color: string,
    percentage: number,
    circumference: number,
    offsetPercentage = 0,
): CSSProperties => ({
    stroke: color,
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: circumference - (percentage + offsetPercentage) * circumference,
    // axis compensation
    transformOrigin: "50% 50%",
});

const Circle = ({
    fillPercentage,
    offsetPercentage,
    color,
}: ICircle) => {
    const theme = useTheme();
    const forceUpdate = useForceUpdate();

    const $circle = useRef<any>();
    const [isFirstCircumference, setIsFirstCircumference] = useState<boolean>(true);

    const radius = $circle.current ? $circle.current.r.baseVal.value : 0;
    const circumference = radius * 2 * Math.PI;
    const circleStyles = createStyles(color, fillPercentage, circumference, offsetPercentage);
    const styles = {
        ...circleStyles,
        // Animation
        transition: isFirstCircumference ? "0s" : `${theme.transitions.duration.complex}ms stroke-dashoffset`,
    };

    // Helps creating appear animation
    if (isFirstCircumference && circumference) {
        styles.strokeDashoffset = circumference;
    }
    useEffect(() => {
        if (isFirstCircumference && circumference) {
            forceUpdate();
            setTimeout(() => setIsFirstCircumference(false), 0);
        }
    }, [isFirstCircumference, circleStyles, forceUpdate, circumference]);

    return (
        <circle
            ref={reference => {
                if (reference && !$circle.current) {
                    $circle.current = reference;
                    forceUpdate();
                }
            }}
            style={styles}
            fill="transparent"
            r="40"
            cx="60"
            cy="60"
            strokeWidth="22"
        />
    );
};

Circle.defaultProps = {
    offsetPercentage: 0,
};

export default Circle;
