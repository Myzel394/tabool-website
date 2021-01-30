import React from "react";
import {LessonRelatedDetail, Subject} from "types";
import {useAdaptedColor} from "hooks";
import {Avatar as MUIAvatar, Link, useTheme} from "@material-ui/core";
import tinycolor from "tinycolor2";
import {buildPath} from "utils";


export interface IAvatar {
    lesson?: LessonRelatedDetail;
    subject?: Subject;
}


const Avatar = ({lesson, subject}: IAvatar) => {
    if (!lesson && !subject) {
        throw new Error("Lesson or subject must be set.");
    }

    const theme = useTheme();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: One of lesson or subject is set
    const color: string = lesson?.course?.subject?.userRelation?.color ?? subject?.userRelation?.color;
    const [textColor, backgroundColor] = useAdaptedColor(color, tinycolor(color).setAlpha(theme.palette.action.focusOpacity).toString());

    if (lesson) {
        return (
            <Link
                href={buildPath("/agenda/lesson/detail/:id/", {
                    id: lesson.id,
                })}
                underline="none"
            >
                <MUIAvatar
                    style={{
                        backgroundColor,
                        color: textColor,
                    }}
                >
                    {lesson.course.subject.name.charAt(0).toUpperCase()}
                </MUIAvatar>
            </Link>
        );
    } else if (subject) {
        return (
            <MUIAvatar
                style={{
                    backgroundColor,
                    color: textColor,
                }}
            >
                {subject.name.charAt(0).toUpperCase()}
            </MUIAvatar>
        );
    }

    return null;
};

export default Avatar;
