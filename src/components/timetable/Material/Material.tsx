import React, {memo, useMemo, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    Typography,
    useTheme,
} from "@material-ui/core";
import {
    FaCalculator,
    FaFile,
    FaFileImage,
    FaFilePowerpoint,
    FaFileWord,
    GrDocumentPdf,
    GrDocumentTxt,
    MdFileDownload,
} from "react-icons/all";
import {useTranslation} from "react-i18next";
import prettyBytes from "pretty-bytes";
import {usePersistentStorage} from "hooks";

import {Information} from "../../components";
import {TimeRelative} from "../../statuses";

import GetDownloadLink from "./GetDownloadLink";

export interface IMaterial {
    name: string;
    addedAt: Dayjs;
    size: number;
    id: string;
    isDeleted?: boolean;
}

const EXTENSION_ICON_MAPPING = {
    pdf: GrDocumentPdf,
    jpg: FaFileImage,
    png: FaFileImage,
    txt: GrDocumentTxt,
    doc: FaFileWord,
    docx: FaFileWord,
    ppsx: FaFilePowerpoint,
    pptx: FaFilePowerpoint,
    ggb: FaCalculator,
};

const Material = ({name, addedAt, id, size, isDeleted}: IMaterial) => {
    const theme = useTheme();
    const {t} = useTranslation();

    const [downloadFile, setDownloadFile] = useState<boolean>(false);
    const [downloadDate, setDownloadDate] = usePersistentStorage<Dayjs | null>(
        null,
        `material_has_downloaded_${id}`,
        undefined,
        value => (value ? value.toISOString() : JSON.stringify(null)),
        string => {
            const date = dayjs(string);
            return date.isValid() ? date : null;
        },
    );

    const informationStyle = useMemo(() => ({
        wordBreak: "break-all" as "break-all",
        opacity: isDeleted ? theme.palette.action.disabledOpacity : 1,
    }), [isDeleted, theme.palette.action.disabledOpacity]);

    const extension = name.split(".").pop();
    const FormatIcon = (extension && EXTENSION_ICON_MAPPING[extension]) ?? FaFile;

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
            <Dialog open={downloadFile} onBackdropClick={() => setDownloadFile(false)}>
                <DialogTitle>
                    {t("Datei downloaden")}
                </DialogTitle>
                <DialogContent>
                    <GetDownloadLink
                        materialId={id}
                        onClose={() => setDownloadFile(false)}
                        onDownload={() => setDownloadDate(dayjs())}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default memo(Material);
