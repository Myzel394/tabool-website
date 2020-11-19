import React, {HTMLAttributes, ReactNode, useMemo} from "react";

import ColoredContainer, {IColoredContainer} from "./ColoredContainer";

export interface IColoredBox extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    color: IColoredContainer["color"];
    parentTheme?: IColoredContainer["parentTheme"];
}

const ColoredBox = ({
    children,
    style: parentStyle,
    color,
    parentTheme,
    ...other}: IColoredBox) => {
    const style = useMemo(() => ({
        ...parentStyle,
        backgroundColor: color,
    }), [color, parentStyle]);

    return (
        <ColoredContainer color={color} parentTheme={parentTheme}>
            <div style={style} {...other}>
                {children}
            </div>
        </ColoredContainer>
    );
};

export default ColoredBox;
