import React, {useContext} from "react";
import {useInheritedState} from "hooks";
import {Box, CircularProgress, List, ListItem, ListItemText, TextField} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {Alert} from "@material-ui/lab";

import StartPageContext from "../../StartPageContext";

import useClassbook from "./useClassbook";

const AddVideoConference = () => {
    const {t} = useTranslation();
    const {
        dailyData,
        selectedLesson,
    } = useContext(StartPageContext);
    const classbookForLesson = selectedLesson && dailyData.classbooksForLessons.find(classbook => classbook.lesson.id === selectedLesson.id);
    const {
        setVideoConferenceLink,
        classbooks,
        isLoading,
        isError,
        loadAll,
    } = useClassbook();

    const [link, setLink] = useInheritedState<string>(classbookForLesson?.videoConferenceLink ?? "");

    return (
        <>
            <Box mt={2}>
                <TextField
                    autoFocus
                    fullWidth
                    value={link}
                    inputMode="url"
                    name="lesson-video-conference-link"
                    variant="outlined"
                    label={t("Link")}
                    placeholder="https://"
                    onBlur={() => setVideoConferenceLink(link)}
                    onChange={(event) => setLink(event.target.value)}
                />
            </Box>
            {(() => {
                if (isLoading) {
                    return (
                        <Box display="flex" alignItems="center" justifyContent="center" my={2}>
                            <CircularProgress />
                        </Box>
                    );
                }

                if (isError || !classbooks) {
                    return (
                        <Alert severity="error">
                            {t("Stunden konnten nicht geladen werden.")}
                        </Alert>
                    );
                }

                if (!classbooks.length) {
                    return (
                        <Alert severity="info">
                            {t("Keine Konferenzen verfügbar")}
                        </Alert>
                    );
                }

                return (
                    <List dense>
                        {classbooks.map(classbook =>
                            <ListItem key={classbook.id} button onClick={() => setLink(classbook.videoConferenceLink)}>
                                <ListItemText
                                    primary={classbook.videoConferenceLink}
                                    secondary={loadAll
                                        ? `${classbook.lessonDate.format("LL")} | ${classbook.lesson.course.subject.name}`
                                        : classbook.videoConferenceLink
                                    }
                                />
                            </ListItem>)}
                    </List>
                );
            })()}
        </>
    );
};

export default AddVideoConference;
