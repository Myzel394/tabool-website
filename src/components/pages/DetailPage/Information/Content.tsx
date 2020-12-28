import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormHelperText,
    Grid,
    IconButton,
    Typography,
} from "@material-ui/core";
import {ToggleButton} from "@material-ui/lab";
import {MdClose, MdEdit} from "react-icons/all";
import {useTranslation} from "react-i18next";
import Truncate from "react-truncate";
import {PrimaryButton, Tooltip} from "components";

export interface IContent {
    icon: JSX.Element;
    title: string;
    information: string | JSX.Element;

    showEdit: boolean;

    disableShowMore?: boolean;
    onEditModeLeft?: () => any;
    helpText?: string;
    subInformation?: JSX.Element;
    field?: {
        onEditModeLeft: () => any;
        renderField: JSX.Element;
    };
}

const Content = ({
    disableShowMore: givenDisableShowMore,
    icon,
    information,
    title,
    onEditModeLeft,
    helpText,
    subInformation,
    showEdit,
    field,
}: IContent) => {
    const {t} = useTranslation();

    const [isEditActive, setIsEditActive] = useState<boolean>(false);
    const [softTruncateActive, setSoftTruncateActive] = useState<boolean>(true);
    const [showFullText, setShowFullText] = useState<boolean>(false);

    const disableShowMore = givenDisableShowMore || React.isValidElement(information);
    const ellipsisElement = (
        <>
            <span>...</span>
            <Button color="default" onClick={() => setSoftTruncateActive(prevState => !prevState)}>
                {softTruncateActive ? t("Mehr anzeigen") : t("Weniger anzeigen")}
            </Button>
            {!softTruncateActive && (
                <Button
                    color="default" onClick={() => {
                        setShowFullText(true);
                        setSoftTruncateActive(true);
                    }}
                >
                    {t("Ganzen Text anzeigen")}
                </Button>
            )}
        </>
    );
    const titleElement = (
        <Typography
            component="dt"
            variant="h5"
            color="textSecondary"
        >
            <Box display="flex" flexDirection="row" alignItems="center">
                {icon}
                <Box ml={1} component="span">
                    {title}
                </Box>
            </Box>
        </Typography>
    );

    // Force edit mode
    useEffect(() => {
        if (!isEditActive) {
            setIsEditActive(true);
        }
    }, [forceEdit, isEditActive]);

    useEffect(() => {
        setIsEditActive(showEdit);
    }, [showEdit]);

    return (
        <>
            <Box px={2} width="100%">
                <Grid
                    container spacing={2} direction="column"
                >
                    <Grid item>
                        {titleElement}
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" spacing={1} justify="space-between">
                            <Grid item>
                                {isEditActive ? (
                                    <>
                                        {input}
                                        {helpText && <FormHelperText>{helpText}</FormHelperText>}
                                        {errors?.map(error => (
                                            <FormHelperText key={error} error>{error}</FormHelperText>
                                        ))}
                                    </>
                                ) : (
                                    <Grid container direction="row" spacing={1} alignItems="center">
                                        <Grid item>
                                            <Typography
                                                component="dd"
                                                variant="body1"
                                            >
                                                {disableShowMore ? information : (
                                                    <Truncate
                                                        lines={softTruncateActive ? 8 : 40}
                                                        ellipsis={ellipsisElement}
                                                    >
                                                        {information}
                                                    </Truncate>
                                                )}
                                            </Typography>
                                            {subInformation}
                                        </Grid>
                                        {isUpdating && (
                                            <Grid item>
                                                <CircularProgress size="1.5em" />
                                            </Grid>
                                        )}
                                    </Grid>
                                )}
                            </Grid>
                            {input && (
                                <Grid item>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <Tooltip title={isEditActive ? t("Änderungen speichern").toString() : t("Dieses Feld editieren").toString()}>
                                                <ToggleButton
                                                    selected={isEditActive}
                                                    disabled={forceEdit}
                                                    onChange={() => setIsEditActive(prevState => {
                                                        const value = !prevState;
                                                        if (!value) {
                                                            if (onEditModeLeft) {
                                                                onEditModeLeft();
                                                            }
                                                        }
                                                        return value;
                                                    })}
                                                >
                                                    <MdEdit />
                                                </ToggleButton>
                                            </Tooltip>
                                        </Grid>
                                        {isEditActive && (
                                            <Grid item>
                                                <Tooltip title={t("Änderungen verwerfen").toString()}>
                                                    <IconButton
                                                        onClick={() => {
                                                            setIsEditActive(false);
                                                            if (reset) {
                                                                reset();
                                                            }
                                                        }}
                                                    >
                                                        <MdClose />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Dialog open={showFullText} maxWidth="md" onBackdropClick={() => setShowFullText(false)}>
                <DialogTitle>
                    {titleElement}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {information}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <PrimaryButton onClick={() => setShowFullText(false)}>
                        {t("Schließen")}
                    </PrimaryButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

Content.defaultProps = {
    forceEdit: false,
    isUpdating: false,
    input: null,
    disableShowMore: false,
};

export default Content;
