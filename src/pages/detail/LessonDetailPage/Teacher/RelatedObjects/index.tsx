import {
    TeacherHomeworkDetail, TeacherLessonDetail, TeacherLessonView,
    TeacherMaterialDetail,
    TeacherModificationDetail,
    TeacherSubmissionDetail,
} from "types";
import {Grid} from "@material-ui/core";
import React, {Dispatch, SetStateAction} from "react";
import {Dayjs} from "dayjs";

import Homeworks from "./Homeworks";
import Materials from "./Materials";
import RelatedObjectsContext from "./RelatedObjectsContext";
import Submissions from "./Submissions";
import Modifications from "./Modifications";

interface IRelatedContent {
    lesson: TeacherLessonDetail;
    date: Dayjs;
    homeworks: TeacherHomeworkDetail[];
    materials: TeacherMaterialDetail[];
    modifications: TeacherModificationDetail[];
    submissions: TeacherSubmissionDetail[];

    updateLesson: Dispatch<SetStateAction<TeacherLessonView>>;
}

const fullWidth = {
    width: "100%",
};

const RelatedObjects = ({
    lesson,
    date,
    homeworks,
    materials,
    submissions,
    modifications,
    updateLesson,
}: IRelatedContent) => {
    return (
        <RelatedObjectsContext.Provider
            value={{
                lessonDate: date,
                lesson,
                updateLesson,
                materials,
                submissions,
                modifications,
                homeworks,
            }}
        >
            <Grid container spacing={4}>
                <Grid item style={fullWidth}>
                    <Homeworks homeworks={homeworks} lesson={lesson} date={date} />
                </Grid>
                <Grid item style={fullWidth}>
                    <Materials />
                </Grid>
                <Grid item style={fullWidth}>
                    <Submissions />
                </Grid>
                <Grid item style={fullWidth}>
                    <Modifications />
                </Grid>
            </Grid>
        </RelatedObjectsContext.Provider>
    );
};

export default RelatedObjects;
