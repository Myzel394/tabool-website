import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {
    CircularProgress,
    DialogContentText, IconButton,
    ListItem, ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText, Switch,
} from "@material-ui/core";
import {FaBell, MdMoreVert} from "react-icons/all";
import {TeacherMaterialDetail} from "types";
import {usePrettyBytes} from "hooks";

import ListItemOptions from "../../ListItemOptions";
import {ExtensionAvatar, ICON_SIZE} from "../../components";

import useUpdate, {UseUpdateData} from "./useUpdate";

export interface TeacherMaterialListElementProps {
    material: TeacherMaterialDetail;

    onUpdate?: UseUpdateData["onUpdate"];
    onDelete?: UseUpdateData["onDelete"];
}

const TeacherMaterialListElement = ({
    material,
    onUpdate,
    onDelete,
}: TeacherMaterialListElementProps) => {
    const {t} = useTranslation();
    const prettyBytes = usePrettyBytes();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        isDeleting,
        isUpdating,
        update,
        delete: deleteMaterial,
    } = useUpdate({
        id: material.id,
        onUpdate,
        onDelete,
    });

    const toggleAnnounce = () => update({
        announce: !material.announce,
    });

    return (
        <ListItemOptions
            lessonWeekdays={material.lesson.course.weekdays}
            lessonColor={material.lesson.course.subject.userRelation.color}
            pickerType="datetime"
            isDeleting={isDeleting}
            title={material.name}
            isOpen={isOpen}
            date={material.publishDatetime}
            downloadLink={material.file}
            deleteConfirmChildren={
                <>
                    <DialogContentText>
                        {t("Möchtest du wirklich dieses Material löschen?")}
                    </DialogContentText>
                    <code>
                        <pre>{material.name}</pre>
                    </code>
                </>
            }
            extraFields={
                <ListItem
                    button
                    disabled={isUpdating || material.announce || material.isUploaded()}
                    onClick={toggleAnnounce}
                >
                    <ListItemIcon>
                        <FaBell size={ICON_SIZE} />
                    </ListItemIcon>
                    <ListItemText primary={t("Ankündigen")} />
                    {isUpdating ? (
                        <CircularProgress size="1rem" color="inherit" />
                    ) : (
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                disabled={isUpdating || material.announce || material.isUploaded()}
                                checked={material.announce}
                                onChange={toggleAnnounce}
                            />
                        </ListItemSecondaryAction>
                    )}
                </ListItem>
            }
            onClose={() => setIsOpen(false)}
            onDateChange={newDate =>
                update({
                    publishDatetime: newDate,
                })
                    .then(() => setIsOpen(false))
            }
            onDelete={() =>
                deleteMaterial()
                    .then(() => setIsOpen(false))
            }
        >
            <ListItemAvatar>
                <ExtensionAvatar name={material.name} />
            </ListItemAvatar>
            <ListItemText
                primary={material.name}
                secondary={prettyBytes(material.size)}
            />
            <ListItemSecondaryAction>
                <IconButton onClick={() => setIsOpen(true)}>
                    <MdMoreVert />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItemOptions>
    );
};

export default TeacherMaterialListElement;
