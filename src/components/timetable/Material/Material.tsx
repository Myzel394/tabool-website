import React, {memo, useMemo, useState} from "react";
import {Dayjs} from "dayjs";
import {Box, Grid, IconButton, Paper, Typography, useTheme} from "@material-ui/core";
import {FaFile, MdFileDownload} from "react-icons/all";
import {useTranslation} from "react-i18next";
import prettyBytes from "pretty-bytes";
import {useSelector} from "react-redux";
import {getMaterialDownloadDate, RootState} from "state";

import {Information} from "../../components";
import {TimeRelative} from "../../statuses";
import extensionIconMap from "../../extensionIconMap";

import GetDownloadLink from "./GetDownloadLink";

export interface IMaterial {
    name: string;
    addedAt: Dayjs;
    size: number;
    id: string;
    isDeleted?: boolean;
}


const Material = ({name, addedAt, id, size, isDeleted}: IMaterial) => {
    const theme = useTheme();
    const downloadDate = useSelector<RootState>(getMaterialDownloadDate(id)) as Dayjs | null;
    const {t} = useTranslation();

    const [downloadFile, setDownloadFile] = useState<boolean>(false);

    const informationStyle = useMemo(() => ({
        wordBreak: "break-all" as "break-all",
        opacity: isDeleted ? theme.palette.action.disabledOpacity : 1,
    }), [isDeleted, theme.palette.action.disabledOpacity]);

    const extension = name ? name.split(".")
        .pop() : "";
    const FormatIcon = (extension && extensionIconMap[extension]) ?? FaFile;

    return (
        <>
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
                            <IconButton color="default" onClick={() => setDownloadFile(true)}>
                                <MdFileDownload />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <GetDownloadLink
                isOpen={downloadFile}
                materialId={id}
                onClose={() => setDownloadFile(false)}
            />
        </>
    );
};

export default memo(Material);
