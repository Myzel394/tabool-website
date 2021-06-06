import React from "react";
import {ExamIcon, HomeworkIcon} from "mappings";
import {useTranslation} from "react-i18next";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {buildPath} from "utils";
import {FocusedPage} from "components";

const ITEM_SIZE = "1.5rem";

const TeacherAgendaPage = () => {
    const {t} = useTranslation();

    return (
        <FocusedPage disableBackButton title={t("Agenda")}>
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
                        primary={t("Arbeit hinzufügen")}
                    />
                </ListItem>
            </List>
        </FocusedPage>
    );
};

export default TeacherAgendaPage;
