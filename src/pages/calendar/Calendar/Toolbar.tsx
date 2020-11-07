import React, {useCallback} from "react";
import {Box, Button, Container, IconButton} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {FaCaretLeft, FaCaretRight, MdViewDay, MdViewWeek} from "react-icons/all";
import {NavigateAction, ToolbarProps, View} from "react-big-calendar";
import {navigate as navigationConstants} from "react-big-calendar/lib/utils/constants";
import {Tooltip} from "components";
import {isMobile} from "react-device-detect";

export interface IToolbar extends ToolbarProps {
    onViewChange: (newValue: View) => any;
}

const Toolbar = ({onNavigate, label, onViewChange, view, ...other}: IToolbar) => {
    const {t} = useTranslation();
    const navigate = (target: NavigateAction) => onNavigate(target);
    const getColor = useCallback((targetdView: View) => (view === targetdView ? "primary" : "default"),
        [view]);

    return (
        <Container maxWidth="md">
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                m="auto"
                width="fit-content"
            >
                <Box
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                    my={2}
                >
                    <Tooltip title={t("Zurück").toString()}>
                        <IconButton onClick={navigate.bind(null, navigationConstants.PREVIOUS)}>
                            <FaCaretLeft />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t("Heute").toString()}>
                        <Button color="default" onClick={navigate.bind(null, navigationConstants.TODAY)}>
                            {label}
                        </Button>
                    </Tooltip>
                    <Tooltip title={t("Weiter").toString()}>
                        <IconButton onClick={navigate.bind(null, navigationConstants.NEXT)}>
                            <FaCaretRight />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box display="flex" flexDirection="row">
                    {!isMobile && (
                        <>
                            <IconButton color={getColor("day")} onClick={onViewChange.bind(null, "day")}>
                                <MdViewDay />
                            </IconButton>
                            <IconButton color={getColor("work_week")} onClick={onViewChange.bind(null, "work_week")}>
                                <MdViewWeek />
                            </IconButton>
                        </>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

const proxyToolbar = (extraProps: {
    onViewChange: (newValue: View) => any;
}) => props => Toolbar({
    ...props,
    ...extraProps,
});

export default proxyToolbar;
