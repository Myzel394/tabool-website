import React from "react";
import {Avatar, AvatarProps, useTheme} from "@material-ui/core";
import {useAdaptedColor} from "hooks";
import {getExtension} from "utils";

import {EXTENSION_COLOR_MAPPING, EXTENSION_ICON_MAPPING} from "../extensions";

export interface ExtensionAvatarProps extends AvatarProps {
    name: string;

    color?: string;
}

const getColor = value => EXTENSION_COLOR_MAPPING[value] ?? "#888";

const ExtensionAvatar = ({
    name,
    color: parentColor,
    style = {},
    ...other
}: ExtensionAvatarProps) => {
    const theme = useTheme();
    const extension = getExtension(name);

    const mainColor = parentColor ?? getColor(extension.toLowerCase());
    const [textColor, backgroundColor] = useAdaptedColor(parentColor || theme.palette.background.default, mainColor);

    const Icon = EXTENSION_ICON_MAPPING[extension];

    return (
        <Avatar
            {...other}
            style={{
                ...style,
                backgroundColor,
                cursor: "pointer",
            }}
        >
            {Icon ? <Icon color={textColor} /> : extension.toUpperCase().substr(0, 3)}
        </Avatar>
    );
};

export default ExtensionAvatar;
