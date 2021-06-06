import React, {useRef} from "react";
import {Box, Grid, List, Typography} from "@material-ui/core";
import {ShowMoreArray, ShowMoreButton} from "components";
import {Avatar} from "modules";
import {TeacherSubmissionDetail} from "types";
import {useForceUpdate} from "@shopify/react-hooks";
import dayjs, {Dayjs} from "dayjs";
import {useElementSize, useRect} from "hooks";

import SubmissionElement from "./SubmissionElement";


export interface SubmissionsListProps {
    listKey: string;
    submissions: TeacherSubmissionDetail[];
}

const fullWidth = {
    width: "100%",
};
const parseKey = (key: string): [string, Dayjs] => {
    const [id, dateStr] = key.split(".");

    return [id, dayjs(dateStr)];
};

const SubmissionsList = ({
    submissions,
    listKey,
}: SubmissionsListProps) => {
    const [lessonId] = parseKey(listKey);
    const lesson = submissions.find(submission => submission.lesson.id === lessonId)!.lesson;

    const $outer = useRef<any>();
    const $element = useRef<any>();
    const forceUpdate = useForceUpdate();

    const outerRect = useRect($outer.current);
    const elementRect = useRect($element.current);
    const [, elementHeight = 0] = useElementSize($element.current);

    const diff = elementRect.top - outerRect.top + elementHeight * 0.5;

    return (
        <Grid ref={$outer} item style={fullWidth}>
            <div style={fullWidth}>
                <Box display="flex" style={fullWidth} alignItems="flex-start">
                    <aside style={{transform: `translateY(${diff}px)`}}>
                        <Box display="flex" alignItems="center" flexDirection="column" style={{transform: "translateY(-50%)"}}>
                            <Avatar lesson={lesson} />
                            <Box mt={1}>
                                <Typography variant="body2">
                                    {submissions.length} / {lesson.course.participantsCount}
                                </Typography>
                            </Box>
                        </Box>
                    </aside>
                    <List style={{flexGrow: 1}}>
                        <ShowMoreArray<TeacherSubmissionDetail>
                            elements={submissions}
                            maxElements={3}
                            renderButton={(isShown, update) =>
                                <ShowMoreButton showMore={isShown} onClick={update} />
                            }
                        >
                            {(submission, x, index) =>
                                <SubmissionElement
                                    innerRef={reference => {
                                        if (index === 0 && reference && !$element.current) {
                                            $element.current = reference;
                                            forceUpdate();
                                        }
                                    }}
                                    submission={submission}
                                />
                            }
                        </ShowMoreArray>
                    </List>
                </Box>
            </div>
        </Grid>
    );
};

export default SubmissionsList;
