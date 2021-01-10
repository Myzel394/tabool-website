import React, {memo, useMemo} from "react";
import {LessonDetail} from "types";
import {useAdaptedColor} from "hooks";
import {Avatar as MUIAvatar, ButtonBase, Link, useTheme} from "@material-ui/core";
import tinycolor from "tinycolor2";
import {generatePath} from "react-router-dom";


export interface IAvatar {
    lesson: LessonDetail;
}


const Avatar = ({lesson}: IAvatar) => {
    const theme = useTheme();
    const {color} = lesson.lessonData.course.subject.userRelation;
    const [textColor, backgroundColor] = useAdaptedColor(color, tinycolor(color).setAlpha(theme.palette.action.focusOpacity).toString());
    const style = useMemo(() => ({
        borderRadius: theme.shape.borderRadius,
    }), [theme.shape.borderRadius]);

    return (
        <ButtonBase style={style}>
            <Link
                href={generatePath("/agenda/lesson/detail/:id/", {
                    id: lesson.id,
                })}
                underline="none"
            >
                <MUIAvatar
                    style={{
                        backgroundColor,
                        color: textColor,
                    }}
                    variant="rounded"
                >
                    {lesson.lessonData.course.subject.name.charAt(0).toUpperCase()}
                </MUIAvatar>
            </Link>
        </ButtonBase>
    );
};

export default memo(Avatar);
