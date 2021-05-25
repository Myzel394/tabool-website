import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Button,
    CircularProgress,
    DialogContentText, IconButton,
    ListItem, ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText, Switch,
} from "@material-ui/core";
import {FaBell, MdInfo, MdMoreVert} from "react-icons/all";
import {TeacherMaterialDetail} from "types";
import {usePrettyBytes, useSnackbar} from "hooks";

import ListItemOptions from "../../ListItemOptions";
import {ExtensionAvatar, ICON_SIZE} from "../../components";
import AnnounceExplanation from "../../AnnounceExplanation";

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
    const {
        addWarning,
    } = useSnackbar();

    const [isAnnounceOpen, setIsAnnounceOpen] = useState<boolean>(false);
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

    const toggleAnnounce = () => {
        if (isUpdating || material.announce || material.isUploaded()) {
            // Disabled
            addWarning(t("Ankündigungen können nicht mehr zurückgenommen werden."));
        } else {
            update({
                announce: !material.announce,
            });
        }
    };

    return (
        <>
            <ListItemOptions
                lessonWeekdays={material.lesson.course.weekdays}
                lessonColor={material.lesson.course.subject.userRelation.color}
                pickerType="datetime"
                isDeleting={isDeleting}
                title={material.name}
                description={t("Am {{date}} hochgeladen", {
                    date: material.createdAt.format("LL"),
                })}
                isOpen={isOpen}
                publishDatetimeTitle={t("Veröffentlichkeitsdatum ändern")}
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
                    <>
                        <ListItem
                            button
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
                                        checked={material.announce}
                                        onChange={toggleAnnounce}
                                    />
                                </ListItemSecondaryAction>
                            )}
                        </ListItem>
                        <Button startIcon={<MdInfo />} onClick={() => setIsAnnounceOpen(true)}>
                            {t("Was bringt das?")}
                        </Button>
                    </>
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
                    <a href={material.file} target="_blank" rel="noreferrer">
                        <ExtensionAvatar name={material.name} />
                    </a>
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
            <AnnounceExplanation
                isOpen={isAnnounceOpen}
                onClose={() => setIsAnnounceOpen(false)}
            />
        </>
    );
};

export default TeacherMaterialListElement;
