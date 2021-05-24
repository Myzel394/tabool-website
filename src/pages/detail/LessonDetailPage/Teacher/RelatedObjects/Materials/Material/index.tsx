import React, {useState} from "react";
import {TeacherMaterialDetail} from "types";
import {
    Checkbox,
    CircularProgress,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from "@material-ui/core";
import {BottomSheetAction, DueDateChanger, ExtensionAvatar, ICON_SIZE} from "components";
import dayjs from "dayjs";
import {FaBell, MdDeleteForever, MdFileDownload, MdSettings} from "react-icons/all";
import {useTranslation} from "react-i18next";

import useUpdate from "./useUpdate";


export interface MaterialProps {
    material: TeacherMaterialDetail;
}

const Material = ({
    material,
}: MaterialProps) => {
    const {t} = useTranslation();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        isDeleting,
        isUpdating,
        update,
        delete: deleteMaterial,
    } = useUpdate(material.id);

    const toggleAnnounce = () => update({
        announce: !material.announce,
    });

    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <ExtensionAvatar name={material.name} />
                </ListItemAvatar>
                <ListItemText
                    primary={material.name}
                    secondary={material.size}
                />
                <ListItemSecondaryAction>
                    <IconButton>
                        <MdSettings onClick={() => setIsOpen(true)} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <BottomSheetAction
                isOpen={isOpen}
                title={material.name}
                onClose={() => setIsOpen(false)}
            >
                <ListItem
                    button
                    download
                    disabled={isDeleting}
                    component="a"
                    href={material.file}
                    target="_blank"
                >
                    <ListItemIcon>
                        <MdFileDownload size={ICON_SIZE} />
                    </ListItemIcon>
                    <ListItemText primary={t("Download")} />
                </ListItem>

                <DueDateChanger
                    disableClearing
                    pickerType="datetime"
                    disabled={isDeleting || material.publishDatetime.isBefore(dayjs())}
                    weekdays={material.lesson.course.weekdays}
                    color={material.lesson.course.subject.userRelation.color}
                    title={t("Veröffentlichkeitsdatum ändern")}
                    isLoading={isUpdating}
                    date={material.publishDatetime}
                    onChange={newDate =>
                        update({
                            publishDatetime: newDate,
                        })
                            .then(() => setIsOpen(false))
                    }
                />

                <ListItem
                    button
                    disabled={isUpdating || material.publishDatetime.isBefore(dayjs()) || material.announce}
                    onClick={toggleAnnounce}
                >
                    <ListItemIcon>
                        <FaBell size={ICON_SIZE} />
                    </ListItemIcon>
                    <ListItemText primary={t("Ankündigen")} />
                    <ListItemSecondaryAction>
                        <Checkbox
                            disabled={isUpdating || material.publishDatetime.isBefore(dayjs()) || material.announce}
                            checked={material.announce}
                            onChange={toggleAnnounce}
                        />
                    </ListItemSecondaryAction>
                    {isUpdating && <CircularProgress size="1rem" color="inherit" />}
                </ListItem>

                <ListItem
                    button
                    disabled={isDeleting}
                    onClick={() =>
                        deleteMaterial()
                            .then(() => setIsOpen(false))
                    }
                >
                    <ListItemIcon>
                        <MdDeleteForever size={ICON_SIZE} />
                    </ListItemIcon>
                    <ListItemText primary={t("Löschen")} />
                    {isDeleting && <CircularProgress size="1rem" color="inherit" />}
                </ListItem>
            </BottomSheetAction>
        </>
    );
};

export default Material;

// TODO: IBla -> BlaProps
// TODO: Add DeleteConfirmWidget
// TODO: Add announce explanation
