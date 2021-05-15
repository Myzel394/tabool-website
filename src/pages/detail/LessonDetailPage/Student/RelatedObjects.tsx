import React, {Dispatch, memo, SetStateAction} from "react";
import {
    StudentHomeworkDetail,
    StudentLessonDetail,
    StudentLessonView,
    StudentMaterialDetail,
    StudentSubmissionDetail,
} from "types";
import {Grid, Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import update from "immutability-helper";
import {Homework, HorizontalScroll, Material} from "components";
import {truncate} from "utils";
import {Dayjs} from "dayjs";

import Submissions from "./Submissions";


export interface IRelatedObjects {
    lesson: StudentLessonDetail;
    lessonDate: Dayjs;
    materials: StudentMaterialDetail[];
    homeworks: StudentHomeworkDetail[];
    submissions: StudentSubmissionDetail[];
    onLessonUpdate: Dispatch<SetStateAction<StudentLessonView>>;
}

const fullWidth = {
    width: "100%",
};

const RelatedObjects = ({
    homeworks,
    materials,
    submissions,
    onLessonUpdate,
    lesson,
    lessonDate,
}: IRelatedObjects) => {
    const {t} = useTranslation();

    return (
        <Grid container spacing={4}>
            <Grid item style={fullWidth}>
                <Typography variant="h2">
                    {t("Materialien")}
                </Typography>
                {materials.length
                    ? materials.map(material =>
                        <Material
                            key={material.id}
                            size={material.size}
                            file={material.file}
                            name={material.name}
                            id={material.id}
                            publishDatetime={material.publishDatetime}
                        />)
                    : (
                        <Alert severity="info">
                            {t("Keine Materialien verfügbar")}
                        </Alert>
                    )
                }
            </Grid>
            <Grid item style={fullWidth}>
                <Typography variant="h2">
                    {t("Hausaufgaben")}
                </Typography>
                {homeworks.length
                    ? (
                        <HorizontalScroll<StudentHomeworkDetail> elements={homeworks}>
                            {homework =>
                                <Homework
                                    key={homework.id}
                                    id={homework.id}
                                    information={truncate(homework.information ?? "")}
                                    creationDate={homework.createdAt}
                                    dueDate={homework.dueDate}
                                    subject={homework.lesson.course.subject}
                                    completed={homework.userRelation.completed}
                                    ignored={homework.userRelation.ignored}
                                    onServerUpdate={async newRelation => onLessonUpdate(prevState => update(prevState, {
                                        homeworks: {
                                            [prevState.homeworks.findIndex(element => homework.id === element.id)]: {
                                                userRelation: {
                                                    $set: newRelation,
                                                },
                                            },
                                        },
                                    }))}
                                />
                            }
                        </HorizontalScroll>
                    )
                    : (
                        <Alert severity="info">
                            {t("Keine Hausaufgaben verfügbar")}
                        </Alert>
                    )
                }
            </Grid>
            <Grid item style={fullWidth}>
                <Typography variant="h2">
                    {t("Einsendungen")}
                </Typography>
                <Submissions submissions={submissions} lesson={lesson} lessonDate={lessonDate} />
            </Grid>
        </Grid>
    );
};

export default memo(RelatedObjects);
