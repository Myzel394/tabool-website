import React, {ReactNode, useMemo} from "react";
import {useDropzone} from "react-dropzone";
import {
    Box,
    ButtonBase,
    Collapse,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    useTheme,
} from "@material-ui/core";
import prettyBytes from "pretty-bytes";
import {useTranslation} from "react-i18next";
import tinycolor from "tinycolor2";
import {MdAdd, MdFileUpload} from "react-icons/all";
import {usePrevious} from "hooks";

import Information from "../Information";

import ExtensionAvatar from "./ExtensionAvatar";

export interface IDropZone<FileType = any> {
    value: FileType[];
    onChange: (files: FileList) => any;

    renderList: (element: FileType[]) => ReactNode;

    disabled?: boolean;
    acceptedFormats?: string[];
    maxFiles?: number;
}

const DropZone = <FileType extends any = any>({
    value,
    onChange,
    renderList,
    disabled,
}: IDropZone<FileType>) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        getFilesFromEvent: async (event) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;

            if (files !== undefined) {
                onChange(files);
            }
            return [];
        },
    });
    const mainColor = tinycolor(theme.palette.text.secondary)
        .setAlpha(isDragActive ? 1 : theme.palette.action.activatedOpacity)
        .toString();

    const rootStyle = useMemo(() => ({
        border: `${mainColor} .2em dashed`,
        width: "100%",
        margin: "0 auto",
    }), [mainColor]);

    const previousValue = usePrevious(value, value);

    return (
        <Paper elevation={0}>
            <Box
                {...getRootProps({
                    component: disabled ? "div" : ButtonBase,
                    style: {
                        width: "100%",
                    },
                })}
            >
                <Box p={3} style={rootStyle}>
                    <input {...getInputProps()} disabled={disabled} />
                    {isDragActive ? (
                        <Information
                            getIcon={props => <MdAdd {...props} />}
                            text={t("Datei hinzufügen")}
                            color="textPrimary"
                        />
                    ) : (
                        <Information
                            getIcon={props => <MdFileUpload {...props} />}
                            text={t("Dateien auswählen")}
                            color={disabled ? "textSecondary" : "textPrimary"}
                        />
                    )}
                </Box>
            </Box>
            <Collapse in={Boolean(value.length)}>
                <Box m={2}>
                    {renderList(value.length ? value : previousValue)}
                </Box>
            </Collapse>
        </Paper>
    );
};

DropZone.defaultProps = {
    // eslint-disable-next-line react/display-name
    renderList: (files) => (
        <List>
            {files.map(file =>
                <ListItem key={file.name}>
                    <ListItemAvatar>
                        <ExtensionAvatar name={file.name} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={file.name}
                        secondary={prettyBytes(file.size, {
                            locale: "de",
                        })}
                    />
                </ListItem>)}
        </List>
    ),
};

export default DropZone;
export {default as ExtensionAvatar} from "./ExtensionAvatar";
