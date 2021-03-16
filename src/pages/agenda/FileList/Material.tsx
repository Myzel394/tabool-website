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
import {useUserPreferences} from "hooks";
import {useTranslation} from "react-i18next";


export interface IMaterial {
    filename: string;
    id: string;
    lessonId: string;
    size?: number;
}

const Material = ({
    filename,
    id,
    lessonId,
    size,
}: IMaterial) => {
    const {t} = useTranslation();
    const {state} = useUserPreferences();
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const extension = filename && filename.split(".")
        .pop();
    const Icon = (extension ? extensionIconMap[extension] : undefined) ?? FaFile;
    const downloadDate = state?.detailPage?.downloadedMaterials?.[id];

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


