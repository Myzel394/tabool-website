import React, {memo} from "react";
import {Box, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import {FaFile, MdFileDownload} from "react-icons/all";
import {useTranslation} from "react-i18next";
import dayjs, {Dayjs} from "dayjs";
import {getMaterialDownloadDateString} from "utils";
import {useDispatch, useSelector} from "react-redux";
import {addDownloadedMaterialsDate, getMaterialDownloadDate, RootState} from "state";

import {Information} from "../components";
import {TimeRelative} from "../statuses";
import extensionIconMap from "../extensionIconMap";
import {usePrettyBytes} from "../../hooks";

export interface MaterialProps {
    name: string;
    size: number;
    file: string;
    id: string;
    publishDatetime?: Dayjs | null;
}


const Material = ({name, id, size, file, publishDatetime}: MaterialProps) => {
    const dispatch = useDispatch();
    const downloadDate = useSelector<RootState>(getMaterialDownloadDate(id)) as Dayjs | null;
    const {t} = useTranslation();
    const prettyBytes = usePrettyBytes();

    const extension = name ? name.split(".").pop() : "";
    const FormatIcon = (extension && extensionIconMap[extension]) ?? FaFile;
    const isAvailable = publishDatetime?.isBefore(dayjs());

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
                                    color="textPrimary"
                                />
                                {!isAvailable && getMaterialDownloadDateString(t, publishDatetime)}
                                <Typography variant="body2" color="textSecondary">
                                    {t("Größe: {{size}}", {
                                        size: prettyBytes(size),
                                    })}
                                </Typography>
                            </Grid>
                            <Grid item>
                                {downloadDate && (
                                    <TimeRelative>
                                        {now =>
                                            <Typography variant="body2" color="textSecondary">
                                                {t("Zuletzt runtergeladen: {{relative}}", {
                                                    relative: downloadDate.from(dayjs(now).add(3, "second")),
                                                })}
                                            </Typography>
                                        }
                                    </TimeRelative>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <IconButton
                            color="default"
                            href={file}
                            target="_blank"
                            disabled={!isAvailable}
                            onClick={() => {
                                dispatch(addDownloadedMaterialsDate({
                                    materialId: id,
                                }));
                            }}
                        >
                            <MdFileDownload />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default memo(Material);
