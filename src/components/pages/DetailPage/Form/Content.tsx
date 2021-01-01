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
import {FormikProps} from "formik/dist/types";
import Truncate from "react-truncate";

import Tooltip from "../../../Tooltip";
import SimpleDialog from "../../../SimpleDialog";

interface RenderFieldProps extends FormikProps<any> {
    helperText?: string | JSX.Element;
}


export interface IContent {
    title: string;
    icon: JSX.Element | null | ((value: any) => JSX.Element | null);
    information: string | JSX.Element;
    value: any;
    isUpdating: boolean;
    onReset: () => any;
    hasChanged: boolean;
    formik: FormikProps<any>;
    name: string;
    isEditModeActive: boolean;
    onChangeEditModeActive: (isActive: boolean) => any;

    helperText?: string | JSX.Element;
    disableShowMore?: boolean;
    renderField?: ((formik: RenderFieldProps) => JSX.Element) | false;
}


const Content = ({
    icon,
    title,
    disableShowMore,
    information,
    helperText,
    isUpdating,
    onReset,
    renderField,
    value,
    hasChanged,
    formik,
    name,
    isEditModeActive,
    onChangeEditModeActive,
}: IContent) => {
    const forceEditMode = Boolean(formik.errors[name]);
    const {t} = useTranslation();

    const [softTruncateActive, setSoftTruncateActive] = useState<boolean>(true);
    const [showFullText, setShowFullText] = useState<boolean>(false);

    return (
        <>
            <Box px={2} width="100%">
                <Grid
                    container
                    spacing={2}
                    direction="column"
                >
                    <Grid item>
                        <Typography
                            component="dt"
                            variant="h5"
                            color="textSecondary"
                        >
                            <Box display="flex" flexDirection="row" alignItems="center">
                                {typeof icon === "function"
                                    ? icon(value)
                                    : icon}
                                <Box ml={1} component="span">
                                    {title}
                                </Box>
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" spacing={1} justify="space-between">
                            <Grid item>
                                {isEditModeActive ? (
                                    <>
                                        {typeof renderField === "function" && renderField({
                                            ...formik,
                                            helperText,
                                        })}
                                    </>
                                ) : (
                                    <Grid container direction="row" spacing={1} alignItems="center">
                                        <Grid item>
                                            <Typography
                                                component="dd"
                                                variant="body1"
                                            >
                                                {(disableShowMore ||
                                                    !(typeof information === "string") ||
                                                    (information.length < 20) ? information : (
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
                                                    ))}
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
                            {renderField && (
                                <Grid item>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <Tooltip title={isEditModeActive ? t("Änderungen speichern").toString() : t("Dieses Feld editieren").toString()}>
                                                <ToggleButton
                                                    selected={isEditModeActive}
                                                    disabled={forceEditMode}
                                                    onChange={() => {
                                                        if (isEditModeActive) {
                                                            if (hasChanged) {
                                                                formik.submitForm();

                                                            } else {
                                                                onChangeEditModeActive(false);
                                                            }
                                                        } else {
                                                            onChangeEditModeActive(true);
                                                        }
                                                    }}
                                                >
                                                    <MdEdit />
                                                </ToggleButton>
                                            </Tooltip>
                                        </Grid>
                                        {isEditModeActive && (
                                            <Grid item>
                                                <Tooltip title={t("Änderungen verwerfen").toString()}>
                                                    <IconButton
                                                        disabled={forceEditMode}
                                                        onClick={() => {
                                                            onChangeEditModeActive(false);
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
                    primaryButton={null}
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

Content.whyDidYouRender = true;

export default Content;
