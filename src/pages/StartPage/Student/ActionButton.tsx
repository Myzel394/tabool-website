import React, {CSSProperties, useContext, useState} from "react";
import {HomeworkIcon} from "components";
import {Backdrop, useTheme} from "@material-ui/core";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@material-ui/lab";
import {UtilsContext} from "contexts";
import {useTranslation} from "react-i18next/src";
import {buildPath, lazyDatetime} from "utils";
import {useHistory} from "react-router-dom";
import {StudentLessonDetail} from "types";
import {Dayjs} from "dayjs";

export interface IActionButton {
    lesson: StudentLessonDetail;
    date: Dayjs;
}

const ActionButton = ({
    lesson,
    date,
}: IActionButton) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const history = useHistory();
    const {
        bottomSheetHeight,
    } = useContext(UtilsContext);
    const speedDialStyle: CSSProperties = {
        position: "fixed",
        bottom: `calc(${theme.spacing(2)}px + ${bottomSheetHeight}px)`,
        right: theme.spacing(2),
        zIndex: theme.zIndex.speedDial,
    };

    const [isSpeedDialOpen, setIsSpeedDialOpen] = useState<boolean>(false);

    return (
        <>
            <Backdrop
                open={isSpeedDialOpen}
                style={{
                    zIndex: theme.zIndex.speedDial - 1,
                }}
                onClick={() => setIsSpeedDialOpen(false)}
            />
            <SpeedDial
                ariaLabel={t("SpeedDial")}
                open={isSpeedDialOpen}
                style={speedDialStyle}
                icon={<SpeedDialIcon />}
                onOpen={() => setIsSpeedDialOpen(true)}
                onClose={() => setIsSpeedDialOpen(false)}
            >
                <SpeedDialAction
                    tooltipOpen
                    tooltipTitle={t("Hausaufgabe hinzufügen").toString()}
                    icon={<HomeworkIcon />}
                    onClick={() => history.push(buildPath("/add/homework/", undefined, {
                        next: window.location.href,
                        lessonId: lesson.id,
                        lessonDate: lazyDatetime(date, "date"),
                    }))}
                />
            </SpeedDial>
        </>
    );
};

export default ActionButton;
