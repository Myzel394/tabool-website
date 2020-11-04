import React, {memo, useMemo} from "react";
import {Box, Button, Container, IconButton} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {FaBackward, FaCalendar, FaCaretLeft, FaCaretRight, FaForward} from "react-icons/all";
import {ToolbarProps} from "react-big-calendar";
import constants from "react-big-calendar/lib/utils/constants";
import {Tooltip} from "components";

export interface IToolbar extends ToolbarProps {}

const Toolbar = ({onNavigate, label}: IToolbar) => {
    const {t} = useTranslation();
    const navigations = useMemo(() => [
        {
            text: t("Heute"),
            icon: <FaCalendar />,
            func: () => onNavigate(constants.TODAY),
        },
        {
            text: t("Zurück"),
            icon: <FaBackward />,
            func: () => onNavigate(constants.PREVIOUS),
        },
        {
            text: t("Weiter"),
            icon: <FaForward />,
            func: () => onNavigate(constants.NEXT),
        },
    ], [onNavigate, t]);

    return (
        <Container maxWidth="md">
            <Box
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                display="flex"
                my={2}
            >
                <Tooltip title={t("Zurück").toString()}>
                    <IconButton onClick={() => onNavigate(constants.PREVIOUS)}>
                        <FaCaretLeft />
                    </IconButton>
                </Tooltip>
                <Tooltip title={t("Heute").toString()}>
                    <Button color="default">
                        {label}
                    </Button>
                </Tooltip>
                <Tooltip title={t("Weiter").toString()}>
                    <IconButton onClick={() => onNavigate(constants.NEXT)}>
                        <FaCaretRight />
                    </IconButton>
                </Tooltip>
            </Box>
        </Container>
    );
};

export default memo(Toolbar);
