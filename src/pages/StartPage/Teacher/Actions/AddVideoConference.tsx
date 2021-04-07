import React, {useState} from "react";
import {IFetchTeacherClassbookResponse, useFetchTeacherClassbookListAPI} from "hooks/apis";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {useInheritedState, useQueryOptions} from "hooks";
import {Box, CircularProgress, List, ListItem, ListItemText, TextField} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {Alert} from "@material-ui/lab";
import update from "immutability-helper";

import {ActionComponentProps} from "./types";
import useClassbook from "./useClassbook";

const AddVideoConference = ({
    lesson,
    date,
    dailyData,
    onDailyDataChange,
}: ActionComponentProps) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchClassbooks = useFetchTeacherClassbookListAPI();
    const classbookForLesson = dailyData.classbooksForLessons.find(classbook => classbook.lesson.id === lesson.id);
    const {
        setVideoConferenceLink,
    } = useClassbook({
        givenClassbook: classbookForLesson,
        associatedLesson: lesson,
        targetedDate: date,
        onSuccess: classbook => {
            const index = dailyData.classbooksForLessons.findIndex(clsbk => clsbk.id === classbook.id);

            if (index) {
                onDailyDataChange(update(dailyData, {
                    classbooksForLessons: {
                        $splice: [
                            [index, 1, classbook],
                        ],
                    },
                }));
            } else {
                onDailyDataChange(update(dailyData, {
                    classbooksForLessons: {
                        $push: [classbook],
                    },
                }));
            }
        },
    });

    const [loadAll, setLoadAll] = useState<boolean>(false);
    const [link, setLink] = useInheritedState<string>(classbookForLesson?.videoConferenceLink ?? "");

    const {
        data,
        isLoading,
        isError,
    } = useQuery<IFetchTeacherClassbookResponse, AxiosError>(
        ["fetch_classbooks_with_video_conference_link", loadAll],
        () => fetchClassbooks({
            containsVideoConferenceLink: true,
            courseId: loadAll ? undefined : lesson.course.id,
            ordering: "-lesson_date",
        }),
        {
            ...queryOptions,
            onSuccess: results => {
                if (!results.results.length) {
                    setLoadAll(true);
                }
            },
        },
    );

    return (
        <>
            <Box mt={2}>
                <TextField
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

                if (isError || !data) {
                    return (
                        <Alert severity="error">
                            {t("Stunden konnten nicht geladen werden.")}
                        </Alert>
                    );
                }

                if (!data.results.length) {
                    return (
                        <Alert severity="info">
                            {t("Keine Konferenzen verfügbar")}
                        </Alert>
                    );
                }

                return (
                    <List dense>
                        {data.results.map(classbook =>
                            <ListItem key={lesson.id} button onClick={() => setLink(classbook.videoConferenceLink)}>
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
