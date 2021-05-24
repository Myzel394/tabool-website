import React from "react";
import {Avatar} from "@material-ui/core";
import {
    AiFillFileZip, AiFillHtml5, FaCode,
    FaFileAudio,
    FaFileImage,
    FaFilePdf, FaFileVideo,
    FaFileWord, FaJava, FaPython, IoLogoCss3,
    RiFileTextFill, SiJavascript,
    SiMicrosoftexcel,
    SiMicrosoftpowerpoint, SiPhp, SiReact, SiTypescript, SiVisualstudiocode,
} from "react-icons/all";

export interface ExtensionAvatarProps {
    name: string;

    color?: string;
}

const EXTENSION_ICON_MAPPING = {
    wav: FaFileAudio,
    mp3: FaFileAudio,

    jpg: FaFileImage,
    png: FaFileImage,
    webp: FaFileImage,
    svg: FaFileImage,
    gif: FaFileImage,

    pdf: FaFilePdf,

    txt: RiFileTextFill,

    doc: FaFileWord,
    docx: FaFileWord,
    odt: FaFileWord,

    ppt: SiMicrosoftpowerpoint,
    pptx: SiMicrosoftpowerpoint,

    csv: SiMicrosoftexcel,
    xml: SiMicrosoftexcel,
    xlsx: SiMicrosoftexcel,
    xlsm: SiMicrosoftexcel,
    xltx: SiMicrosoftexcel,
    xltm: SiMicrosoftexcel,

    mp4: FaFileVideo,
    webm: FaFileVideo,
    mov: FaFileVideo,
    mkv: FaFileVideo,
    avi: FaFileVideo,
    mpeg: FaFileVideo,

    zip: AiFillFileZip,
    "7z": AiFillFileZip,

    html: AiFillHtml5,
    css: IoLogoCss3,
    js: SiJavascript,
    jsx: SiReact,
    ts: SiTypescript,
    tsx: SiReact,
    py: FaPython,
    php: SiPhp,
    vb: SiVisualstudiocode,
    xhml: FaCode,
    java: FaJava,
    scss: FaCode,
    sh: FaCode,
};

const EXTENSION_COLOR_MAPPING = {
    wav: "#205EFC",
    mp3: "#205EFC",

    jpg: "#AAC71D",
    png: "#AAC71D",
    webp: "#AAC71D",
    svg: "#AAC71D",
    gif: "#AAC71D",

    pdf: "#DC1D00",

    txt: "#d98d50",

    doc: "#185ABD",
    docx: "#185ABD",
    odt: "#185ABD",

    ppt: "#C33916",
    pptx: "#C33916",

    csv: "#0F753C",
    xml: "#0F753C",
    xlsx: "#0F753C",
    xlsm: "#0F753C",
    xltx: "#0F753C",
    xltm: "#0F753C",

    mp4: "#37a8ff",
    webm: "#37a8ff",
    mov: "#37a8ff",
    mkv: "#37a8ff",
    avi: "#37a8ff",
    mpeg: "#37a8ff",

    ggb: "#9494F7",

    zip: "#ffe230",
    "7z": "#FF6633",
};

const getColor = value => EXTENSION_COLOR_MAPPING[value] ?? "#888";

const ExtensionAvatar = ({
    name,
    color,
}: ExtensionAvatarProps) => {
    const extension = name.split(".")
        .pop() ?? "";
    const Icon = EXTENSION_ICON_MAPPING[extension];

    return (
        <Avatar
            style={{
                cursor: "pointer",
                backgroundColor: color ?? getColor(extension.toLowerCase()),
            }}
        >
            {Icon ? <Icon /> : extension.toUpperCase().substr(0, 3)}
        </Avatar>
    );
};

export default ExtensionAvatar;
