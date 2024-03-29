import React from "react";
import dayjs, {Dayjs} from "dayjs";
import {IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {FaFile} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {getMaterialDownloadDateString} from "utils";
import {useDispatch, useSelector} from "react-redux";
import {addDownloadedMaterialsDate, getMaterialDownloadDate, RootState} from "states";
import {usePrettyBytes} from "hooks";
import {EXTENSION_ICON_MAPPING, LessonIcon} from "mappings";


export interface FileProps {
    id: string;
    name: string;
    size: number;
    file: string;
    publishDatetime: Dayjs;
    lessonUrl: string;
}

const fullWidth = {
    width: "100%",
};

const File = ({
    id,
    size,
    name,
    file,
    publishDatetime,
    lessonUrl,
}: FileProps) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const date = useSelector<RootState>(getMaterialDownloadDate(id)) as Dayjs | undefined;
    const prettyBytes = usePrettyBytes();

    const isAvailable = publishDatetime.isBefore(dayjs());
    const extension = name ? name
        .split(".")
        .pop()
        : "";
    const FormatIcon = (extension && EXTENSION_ICON_MAPPING[extension]) ?? FaFile;
    const secondaryItems = [
        !isAvailable && getMaterialDownloadDateString(t, publishDatetime),
        isAvailable && date && t("Heruntergeladen am {{date}}", {
            date: dayjs(date).format("lll"),
        }),
        prettyBytes(size),
    ].filter(Boolean);

    return (
        <ListItem
            style={fullWidth}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            button={isAvailable}
            href={isAvailable ? file : undefined}
            target="_blank"
            component="a"
            onClick={() => {
                if (isAvailable) {
                    dispatch(addDownloadedMaterialsDate({
                        materialId: id,
                    }));
                }
            }}
        >
            <ListItemIcon>
                <FormatIcon />
            </ListItemIcon>
            <ListItemText
                primary={name}
                secondary={secondaryItems.join(" | ")}
            />
            <ListItemSecondaryAction>
                <IconButton href={lessonUrl} size="small">
                    <LessonIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
export default File;


