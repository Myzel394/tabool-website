import React, {FC, useRef, useState} from "react";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {TeacherDailyDataView, TeacherLessonDetail} from "types";
import {FaVideo} from "react-icons/all";
import {Backdrop, makeStyles} from "@material-ui/core";
import {SimpleDialog} from "components";
import {Dayjs} from "dayjs";

import useSpeedDialStyle from "../useSpeedDialStyle";

import {ActionComponentProps, AddVideoConference} from "./Actions";

export interface IActionButton {
    requestLesson: () => Promise<TeacherLessonDetail>;
    targetedDate: Dayjs;
    dailyData: TeacherDailyDataView;
    onDailyDataChange: (dailyData: TeacherDailyDataView) => any;
}

export type AvailableActions = "addVideoConference";

export interface Action {
    title: string;
    buttonTitle: string;
    action: AvailableActions;
}

const useClasses = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.speedDial - 1,
    },
}));

const ACTION_COMPONENT_MAP: Record<AvailableActions, FC<ActionComponentProps>> = {
    addVideoConference: AddVideoConference,
};

const ActionButton = ({
    targetedDate,
    onDailyDataChange,
    dailyData,
    requestLesson: parentRequestLesson,
}: IActionButton) => {
    const classes = useClasses();
    const {t} = useTranslation();
    const speedDialStyle = useSpeedDialStyle();

    const $lesson = useRef<TeacherLessonDetail>();

    const [isSpeedDialOpen, setIsSpeedDialOpen] = useState<boolean>(false);

    const [action, setAction] = useState<Action>();

    const requestLesson = () => {
        window.scrollTo(0, 0);
        setIsSpeedDialOpen(false);
        return parentRequestLesson();
    };

    return (
        <>
            <Backdrop open={isSpeedDialOpen} className={classes.backdrop} />
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
                    tooltipTitle={t("Videokonferenz hinzufügen").toString()}
                    icon={<FaVideo />}
                    onClick={() => requestLesson().then(lesson => {
                        $lesson.current = lesson;
                        setAction({
                            action: "addVideoConference",
                            buttonTitle: t("Hinzufügen"),
                            title: t("Videokonferenz hinzufügen"),
                        });
                    })}
                />
            </SpeedDial>
            <SimpleDialog
                maxWidth="md"
                isOpen={Boolean(action)}
                primaryButton={null}
                title={action?.title || ""}
                onClose={() => {
                    $lesson.current = undefined;
                    setAction(undefined);
                }}
            >
                {(() => {
                    if (action?.action) {
                        const Component = ACTION_COMPONENT_MAP[action.action];

                        return (
                            <Component
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore: Lesson is defined when action is defined
                                lesson={$lesson.current}
                                date={targetedDate}
                                dailyData={dailyData}
                                onDailyDataChange={onDailyDataChange}
                            />
                        );
                    }
                })()}
            </SimpleDialog>
        </>
    );
};

export default ActionButton;
