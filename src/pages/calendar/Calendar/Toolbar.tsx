import React from "react";
import {Box, Button, Container, IconButton} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {FaCaretLeft, FaCaretRight} from "react-icons/all";
import {NavigateAction, ToolbarProps, View} from "react-big-calendar";
import {navigate as navigationConstants} from "react-big-calendar/lib/utils/constants";
import {Tooltip} from "components";

export interface IToolbar extends ToolbarProps {

}

const Toolbar = ({onNavigate, label}: IToolbar) => {
    const {t} = useTranslation();
    const navigate = (target: NavigateAction) => onNavigate(target);

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
