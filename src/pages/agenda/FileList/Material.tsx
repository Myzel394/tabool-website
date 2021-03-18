import React, {useState} from "react";
import {
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
    useTheme,
} from "@material-ui/core";
import {extensionIconMap, GetDownloadLink, TimeRelative} from "components";
import {FaFile} from "react-icons/all";
import {buildPath} from "utils";
import prettyBytes from "pretty-bytes";
import {LessonIcon} from "components/icons";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getMaterialDownloadDate} from "state";
import {Dayjs} from "dayjs";


export interface IMaterial {
    filename: string;
    id: string;
    lessonId: string;
    size?: number;
}

const getIcon = (filename: string) => {
    if (!filename) {
        return FaFile;
    }

    const extension = filename.split(".")
        .pop();

    if (!extension) {
        return FaFile;
    }

    return extensionIconMap[extension] ?? FaFile;
};

const Material = ({
    filename,
    id,
    lessonId,
    size,
}: IMaterial) => {
    const {t} = useTranslation();
    const downloadDate = useSelector(getMaterialDownloadDate(id)) as Dayjs | undefined;
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const Icon = getIcon(filename);

    const style = {
        opacity: downloadDate ? 1 - theme.palette.action.activatedOpacity : 1,
    };

    return (
        <>
            <ListItem
                key={id}
                button
                style={style}
                onClick={() => setIsOpen(true)}
            >
                <ListItemIcon>
                    <Icon size="1.5rem" color="inherit" />
                </ListItemIcon>
                <ListItemText
                    primary={filename}
                    secondary={
                        <>
                            {size && prettyBytes(size, {
                                locale: "de",
                            })}
                            {downloadDate &&
                            <TimeRelative>
                                {now =>
                                    <Typography variant="body2" color="textSecondary">
                                        {t("Zuletzt runtergeladen {{relative}}", {
                                            relative: downloadDate.from(now.add(3, "second")),
                                        })}
                                    </Typography>
                                }
                            </TimeRelative>}
                        </>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton
                        size="small"
                        edge="end"
                        href={buildPath("/agenda/lesson/detail/:id", {
                            id: lessonId,
                        })}
                    >
                        <LessonIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <GetDownloadLink
                isOpen={isOpen}
                materialId={id}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
};
export default Material;


