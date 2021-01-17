import React from "react";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExamIcon, HomeworkIcon, RoomIcon} from "components/icons";
import {useTranslation} from "react-i18next";
import {FocusedPage} from "components";
import {buildPath} from "utils";

const ITEM_SIZE = "1.5rem";

const AddPage = () => {
    const {t} = useTranslation();

    return (
        <FocusedPage disableBackButton title={t("Hinzufügen")}>
            <List>
                <ListItem
                    button
                    href={buildPath("/add/homework")}
                    component="a"
                >
                    <ListItemIcon>
                        <HomeworkIcon size={ITEM_SIZE} />
                    </ListItemIcon>
                    <ListItemText
                        primary={t("Hausaufgabe hinzufügen")}
                    />
                </ListItem>
                <ListItem
                    button
                    href={buildPath("/add/exam")}
                    component="a"
                >
                    <ListItemIcon>
                        <ExamIcon size={ITEM_SIZE} />
                    </ListItemIcon>
                    <ListItemText
                        primary={t("Klassenarbeit hinzufügen")}
                    />
                </ListItem>
                <ListItem
                    button
                    href={buildPath("/add/room")}
                    component="a"
                >
                    <ListItemIcon>
                        <RoomIcon size={ITEM_SIZE} />
                    </ListItemIcon>
                    <ListItemText
                        primary={t("Raum hinzufügen")}
                    />
                </ListItem>
            </List>
        </FocusedPage>
    );
};

export default AddPage;
