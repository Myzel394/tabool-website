import React, {memo} from "react";
import {Fade} from "react-reveal";
import {Grid, useTheme} from "@material-ui/core";
import {StudentHomeworkDetail, StudentLessonDetail, StudentMaterialDetail} from "types";
import {SingleLesson} from "modules";

import createShadow from "../../createShadow";

export interface TimetableProps {
    lessons: StudentLessonDetail[];
    homeworks: StudentHomeworkDetail[];
    materials: StudentMaterialDetail[];
}

const fullWith = {
    width: "100%",
};

const Timetable = ({
    lessons,
    homeworks,
    materials,
}: TimetableProps) => {
    const theme = useTheme();

    return (
        <Grid container spacing={2}>
            {lessons.map((lesson, index) =>
                <Grid key={lesson.id} item style={fullWith}>
                    <Fade
                        mountOnEnter
                        left
                        duration={theme.transitions.duration.enteringScreen}
                        delay={index * 100}
                    >
                        <SingleLesson
                            showDetails
                            lesson={lesson}
                            homeworkCount={homeworks.filter(homework => homework.lesson.id === lesson.id).length}
                            materialCount={materials.filter(material => material.lesson.id === lesson.id).length}
                            style={{
                                boxShadow: createShadow(lesson.course.subject.userRelation.color),
                            }}
                        />
                    </Fade>
                </Grid>)}
        </Grid>
    );
};

export default memo(Timetable);
