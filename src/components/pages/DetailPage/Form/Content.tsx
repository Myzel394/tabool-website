import React, {useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    DialogContentText,
    FormHelperText,
    Grid,
    IconButton,
    Typography,
} from "@material-ui/core";
import {ToggleButton} from "@material-ui/lab";
import {MdClose, MdEdit} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {useInheritedState} from "hooks";
import Truncate from "react-truncate";
import {FieldInputProps} from "formik/dist/types";
import {Field} from "formik";

import Tooltip from "../../../Tooltip";
import SimpleDialog from "../../../SimpleDialog";


export interface IContent {
    title: string;
    icon: JSX.Element;
    information: string | JSX.Element;
    isUpdating: boolean;
    onReset: () => any;
    forceEditMode: boolean;
    fieldPropsExtra: FieldInputProps<any>;
    onSubmit: () => Promise<void>;

    helperText?: string | JSX.Element;
    disableShowMore?: boolean;
    fieldProps?: Record<string, any> | false;
    onEditModeLeft?: () => any;
}


const Content = ({
    icon,
    title,
    disableShowMore,
    information,
    helperText,
    isUpdating,
    onEditModeLeft,
    onReset,
    forceEditMode,
    fieldProps,
    fieldPropsExtra,
    onSubmit,
}: IContent) => {
    const {t} = useTranslation();

    const [isEditActive, setIsEditActive] = useInheritedState<boolean>(forceEditMode);
    const [softTruncateActive, setSoftTruncateActive] = useState<boolean>(true);
    const [showFullText, setShowFullText] = useState<boolean>(false);

    return (
        <>
            <Box px={2} width="100%">
                <Grid
                    container spacing={2} direction="column"
                >
                    <Grid item>
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
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" spacing={1} justify="space-between">
                            <Grid item>
                                {isEditActive ? ((typeof fieldProps === "object") && (
                                    <Field
                                        {...fieldPropsExtra}
                                        {...fieldProps}
                                    />
                                )) : (
                                    <Grid container direction="row" spacing={1} alignItems="center">
                                        <Grid item>
                                            <Typography
                                                component="dd"
                                                variant="body1"
                                            >
                                                {disableShowMore ? information : (
                                                    <Truncate
                                                        lines={softTruncateActive ? 8 : 40}
                                                        ellipsis={(
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
                                                        )}
                                                    >
                                                        {information}
                                                    </Truncate>
                                                )}
                                            </Typography>
                                            {(() => {
                                                if (!helperText) {
                                                    return null;
                                                } else if (typeof helperText === "string") {
                                                    return (
                                                        <FormHelperText>
                                                            {helperText}
                                                        </FormHelperText>
                                                    );
                                                } else {
                                                    return helperText;
                                                }
                                            })()}
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                            {fieldProps && (
                                <Grid item>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <Tooltip title={isEditActive ? t("Änderungen speichern").toString() : t("Dieses Feld editieren").toString()}>
                                                <ToggleButton
                                                    selected={isEditActive}
                                                    disabled={forceEditMode}
                                                    onChange={() => {
                                                        if (isEditActive) {
                                                            // eslint-disable-next-line promise/catch-or-return
                                                            onSubmit()
                                                                .then(() => {
                                                                    setIsEditActive(false);
                                                                    onEditModeLeft?.();
                                                                });
                                                        } else {
                                                            setIsEditActive(true);
                                                        }
                                                    }}
                                                >
                                                    <MdEdit />
                                                </ToggleButton>
                                            </Tooltip>
                                        </Grid>
                                        {isEditActive && (
                                            <Grid item>
                                                <Tooltip title={t("Änderungen verwerfen").toString()}>
                                                    <IconButton
                                                        disabled={forceEditMode}
                                                        onClick={() => {
                                                            setIsEditActive(false);
                                                            onReset();
                                                        }}
                                                    >
                                                        <MdClose />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        )}
                                        {isUpdating && (
                                            <Grid item>
                                                <CircularProgress size="1.5rem" />
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            {!disableShowMore &&
                <SimpleDialog
                    isOpen={showFullText}
                    primaryButton={t("Schließen")}
                    title={title}
                    onClose={() => setShowFullText(false)}
                >
                    <DialogContentText>
                        {information}
                    </DialogContentText>
                </SimpleDialog>}
        </>
    );
};

export default Content;
