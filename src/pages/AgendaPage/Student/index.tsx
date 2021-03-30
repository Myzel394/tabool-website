import React from "react";
import {FocusedPage, HomeworkIcon} from "components";
import {useTranslation} from "react-i18next";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {buildPath} from "utils";

const ITEM_SIZE = "1.5rem";

const StudentAgendaPage = () => {
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
            </List>
        </FocusedPage>
    );
};

export default StudentAgendaPage;
