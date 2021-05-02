import React, {useState} from "react";
import {TeacherMaterialDetail} from "types";
import {
    CircularProgress,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Switch,
} from "@material-ui/core";
import {Avatar, BottomSheetAction, ButtonLike} from "components";
import prettyBytes from "pretty-bytes";
import {useTranslation} from "react-i18next";
import {FaBell, MdCheck, MdMoreVert} from "react-icons/all";
import dayjs from "dayjs";

import SecondaryInformation from "../SecondaryInformation";
import DueDateChanger from "../../../../../components/DueDateChanger";

import useQuery from "./useQuery";
import AnnounceExplanation from "./AnnounceExplanation";


export interface IFile {
    material: TeacherMaterialDetail;
}

const listItemStyle = {
    // Aligns with other elements in other sections if left padding is 0
    paddingLeft: 0,
};

const File = ({
    material,
}: IFile) => {
    const {t} = useTranslation();
    const {
        isLoading,
        update,
    } = useQuery({
        material,
    });

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const updateAnnouncement = () => update({
        announce: !material.announce,
    });
    const isPublished = Boolean(material.publishDatetime && material.publishDatetime?.isBefore(dayjs()));

    return (
        <>
            <ListItem style={listItemStyle}>
                <ListItemAvatar>
                    <Avatar lesson={material.lesson} />
                </ListItemAvatar>
                <ButtonLike
                    component="a"
                    color="inherit"
                    py={0}
                    width="100%"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    href={material.file}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    target="_blank"
                >
                    <ListItemText
                        primary={material.name}
                        secondary={
                            <SecondaryInformation
                                information={[
                                    [t("Größe"), prettyBytes(material.size, {locale: "de"})],
                                    [t("Ankündigen"), material.announce ? t("Ja") : t("Nein")],
                                ]}
                            />
                        }
                    />
                </ButtonLike>
                {isPublished ? (
                    <MdCheck size="1.5rem" />
                ) : (
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => setIsOpen(true)}>
                            <MdMoreVert />
                        </IconButton>
                    </ListItemSecondaryAction>
                )}
            </ListItem>
            <BottomSheetAction
                isOpen={isOpen}
                title={material.name}
                onClose={() => setIsOpen(false)}
            >
                <ListItem>
                    <ListItemIcon>
                        <FaBell size="1.5rem" />
                    </ListItemIcon>
                    <ListItemText
                        primary={<AnnounceExplanation isAnnounced={material.announce} />}
                    />
                    {isLoading ? (
                        <CircularProgress color="inherit" size="1rem" />
                    ) : (
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                disabled={isLoading || material.announce || isPublished}
                                checked={material.announce}
                                onClick={updateAnnouncement}
                            />
                        </ListItemSecondaryAction>
                    )}
                </ListItem>
                <DueDateChanger
                    title={t("Veröffentlichkeitsdatum ändern")}
                    color={material.lesson.course.subject.userRelation.color}
                    pickerType="datetime"
                    weekdays={material.lesson.course.weekdays}
                    date={material.publishDatetime}
                    isLoading={isLoading}
                    onChange={newDate => {
                        setIsOpen(false);
                        update({
                            publishDatetime: newDate ?? undefined,
                        });
                    }}
                />
            </BottomSheetAction>
        </>
    );
};

export default File;
