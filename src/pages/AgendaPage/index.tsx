import React from "react";
import {ExamIcon, FocusedPage, HomeworkIcon, RoomIcon} from "components";
import {Box, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import {buildPath} from "utils";
import {useTranslation} from "react-i18next";

const ITEM_SIZE = "1.5rem";

const AgendaPage = () => {
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
            <Box mt={6}>
                <Typography variant="body2" color="textSecondary">
                    {t("Hier entsteht noch etwas...")}
                </Typography>
            </Box>
        </FocusedPage>
    );
};

export default AgendaPage;
