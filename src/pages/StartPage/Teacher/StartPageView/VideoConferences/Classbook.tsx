import React, {useState} from "react";
import {TeacherClassbook} from "types";
import {
    CircularProgress,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from "@material-ui/core";
import {buildPath, lazyDatetime} from "utils";
import {BottomSheetAction} from "components";
import {MdClear, MdEdit, MdMoreVert} from "react-icons/all";
import {useTranslation} from "react-i18next";

import InsertFromClipboard from "./InsertFromClipboard";
import LinkField from "./LinkField";
import useClassbook from "./useClassbook";


export interface ClassbookProps {
    classbook: TeacherClassbook;
}

const Classbook = ({
    classbook,
}: ClassbookProps) => {
    const {t} = useTranslation();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const {
        setVideoConferenceLink,
        isUpdating,
    } = useClassbook(
        classbook.lesson,
        classbook.lessonDate,
        classbook,
    );

    return (
        <>
            <ListItem
                key={classbook.id}
                button
                component="a"
                href={buildPath("/agenda/lesson/detail/:id/:date/", {
                    id: classbook.lesson.id,
                    date: lazyDatetime(classbook.lessonDate, "date") ?? "",
                })}
            >
                <ListItemText
                    primary={
                        <LinkField
                            isEditMode={isEditMode}
                            value={classbook.videoConferenceLink}
                            onChange={link => {
                                setVideoConferenceLink(link);
                                setIsEditMode(false);
                            }}
                        />
                    }
                    secondary={classbook.lessonDate.format("LL")}
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={() => setIsOpen(true)}>
                        <MdMoreVert />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <BottomSheetAction
                isOpen={isOpen}
                title={t("Videokonferenz in {{course}} am {{date}}", {
                    course: classbook.lesson.course.name,
                    date: classbook.lessonDate.format("LL"),
                })}
                onClose={() => setIsOpen(false)}
            >
                <ListItem
                    button
                    disabled={isUpdating}
                    onClick={() => {
                        setIsOpen(false);
                        setVideoConferenceLink("");
                    }}
                >
                    <ListItemIcon>
                        <MdClear size="1.5rem" />
                    </ListItemIcon>
                    <ListItemText
                        primary={t("Video-Konferenz abbrechen")}
                    />
                    {isUpdating && <CircularProgress color="inherit" size="1rem" />}
                </ListItem>

                <ListItem
                    button
                    disabled={isUpdating}
                    onClick={() => {
                        setIsOpen(false);
                        setIsEditMode(true);
                    }}
                >
                    <ListItemIcon>
                        <MdEdit size="1.5rem" />
                    </ListItemIcon>
                    <ListItemText
                        primary={t("Link bearbeiten")}
                    />
                    {isUpdating && <CircularProgress color="inherit" size="1rem" />}
                </ListItem>

                <InsertFromClipboard
                    isUpdating={isUpdating}
                    setVideoConferenceLink={setVideoConferenceLink}
                    close={() => setIsOpen(false)}
                />
            </BottomSheetAction>
        </>
    );
};

export default Classbook;
