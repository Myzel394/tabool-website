import React from "react";
import {Avatar} from "@material-ui/core";

export interface IExtensionAvatar {
    name: string;

    color?: string;
}

const EXTENSION_COLOR_MAPPING = {
    wav: "#37E6FF",
    mp3: "#37E6FF",

    jpg: "#1f9213",
    png: "#1F9213",
    webp: "#1F9213",
    svg: "#2cc61d",

    pdf: "#ee581d",

    txt: "#cf6200",

    doc: "#3D72FF",
    docx: "#3D72FF",

    ppt: "#FF2A16",
    pptx: "#FF2A16",

    mp4: "#37a8ff",

    ggb: "#4D7BFF",

    zip: "#FFD220",
    "7z": "#FFD220",
};

const getColor = value => EXTENSION_COLOR_MAPPING[value] ?? "#888";

const ExtensionAvatar = ({
    name,
    color,
}: IExtensionAvatar) => {
    const extension = name.split(".")
        .pop() ?? "";

    return (
        <Avatar
            style={{
                cursor: "pointer",
                backgroundColor: color ?? getColor(extension.toLowerCase()),
            }}
        >
            {extension.toUpperCase()
                .substr(0, 3)}
        </Avatar>
    );
};

export default ExtensionAvatar;
