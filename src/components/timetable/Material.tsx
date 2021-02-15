import React, {memo, useMemo} from "react";
import {Dayjs} from "dayjs";
import {Box, Grid, IconButton, Paper, Typography, useTheme} from "@material-ui/core";
import {FaFile, MdFileDownload} from "react-icons/all";
import {useTranslation} from "react-i18next";
import prettyBytes from "pretty-bytes";
import {usePreferences} from "hooks";

import {Information} from "../components";
import {TimeRelative} from "../statuses";
import extensionIconMap from "../extensionIconMap";

export interface IMaterial {
    name: string;
    addedAt: Dayjs;
    size: number;
    id: string;
    file: string;
    isDeleted?: boolean;
}


const Material = ({name, addedAt, id, size, isDeleted, file}: IMaterial) => {
    const theme = useTheme();
    const {state} = usePreferences();
    const {t} = useTranslation();

    const informationStyle = useMemo(() => ({
        wordBreak: "break-all" as "break-all",
        opacity: isDeleted ? theme.palette.action.disabledOpacity : 1,
    }), [isDeleted, theme.palette.action.disabledOpacity]);

    const extension = name ? name
        .split(".")
        .pop()
        : "";
    const FormatIcon = (extension && extensionIconMap[extension]) ?? FaFile;
    const downloadDate = state?.detailPage?.downloadedMaterials?.[id];

    return (
        <Paper>
            <Box p={2}>
                <Grid
                    container
                    direction="row"
                    wrap="nowrap"
                    spacing={1}
                    alignItems="center"
                    justify="space-between"
                >
                    <Grid item>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Information
                                    getIcon={props => <FormatIcon {...props} />}
                                    text={name}
                                    style={informationStyle}
                                    color="textPrimary"
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    {t("Hochgeladen: {{uploadDate}}", {
                                        uploadDate: addedAt.format("lll"),
                                    })}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {t("Größe: {{size}}", {
                                        size: prettyBytes(size, {
                                            locale: "de",
                                        }),
                                    })}
                                </Typography>
                                {downloadDate &&
                                <TimeRelative>
                                    {now =>
                                        <Typography variant="body2" color="textSecondary">
                                            {t("Zuletzt runtergeladen: {{relative}}", {
                                                relative: downloadDate.from(now.add(3, "second")),
                                            })}
                                        </Typography>
                                    }
                                </TimeRelative>
                                }
                                {isDeleted &&
                                <Typography variant="body2" color="textSecondary">
                                    {t("Auf Scooso gelöscht")}
                                </Typography>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <IconButton color="default" href={file}>
                            <MdFileDownload />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default memo(Material);
