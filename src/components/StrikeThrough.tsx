import React, {DetailedHTMLProps, HTMLAttributes, memo, ReactNode} from "react";

export interface IStrikeThrough extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
}

const StrikeThrough = ({children, style, ...other}: IStrikeThrough) => {
    const divStyle = {
        textDecoration: "strike-through",
        ...style,
    };

    return (
        <div style={divStyle} {...other}>
            {children}
        </div>
    );
};

export default memo(StrikeThrough);
