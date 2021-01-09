import React, {memo} from "react";
import {LessonDetail} from "types";
import {useAdaptedColor} from "hooks";
import {Avatar as MUIAvatar, useTheme} from "@material-ui/core";
import tinycolor from "tinycolor2";


export interface IAvatar {
    lesson: LessonDetail;
}


const Avatar = ({lesson}: IAvatar) => {
    const theme = useTheme();
    const {color} = lesson.lessonData.course.subject.userRelation;
    const [textColor, backgroundColor] = useAdaptedColor(color, tinycolor(color).setAlpha(theme.palette.action.focusOpacity).toString());

    return (
        <MUIAvatar
            variant="rounded"
            style={{
                backgroundColor,
                color: textColor,
            }}
        >
            {lesson.lessonData.course.subject.name.charAt(0).toUpperCase()}
        </MUIAvatar>
    );
};

export default memo(Avatar);
