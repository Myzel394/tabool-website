import React, {memo, useEffect, useRef, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {useTranslation} from "react-i18next";
import {Box, Checkbox, FormControlLabel, Grid, IconButton, List, Typography} from "@material-ui/core";
import {DropZone, PrimaryButton} from "components";
import update from "immutability-helper";
import {supportsWASM} from "supports";
import {MdFileUpload, MdInfoOutline} from "react-icons/all";

import Element from "./Element";
import ExplainDialog from "./ExplainDialog";


export interface SubmissionUploadFile {
    nativeFile: File;
    uploadDate: Dayjs | null;
}

const SubmitFiles = () => {
    const {t} = useTranslation();

    const $files = useRef<any[]>([]);
    const [files, setFiles] = useState<SubmissionUploadFile[]>([]);
    const [compressImages, setCompressImages] = useState<boolean>(supportsWASM);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    const containsImages = files.some(file => file.nativeFile.type.startsWith("image"));
    const uploadFiles = () => {
        $files.current.forEach(file => file.upload());
    };

    // Update ref length
    useEffect(() => {
        $files.current = Array(files.length);
    }, [files]);

    return (
        <>
            <DropZone<SubmissionUploadFile>
                value={files}
                renderList={(files) =>
                    <>
                        <List>
                            {files.map((file, index) => (
                                <Element
                                    ref={elementRef => $files.current[index] = elementRef}
                                    key={`submission_add_${file.nativeFile.name}_${file.nativeFile.size}_${file.uploadDate?.toISOString()}`}
                                    nativeFile={file.nativeFile}
                                    compressImages={compressImages}
                                    settings={{
                                        uploadDate: file.uploadDate,
                                    }}
                                    onSettingsChange={newSettings => setFiles(update(files, {
                                        [index]: {
                                            uploadDate: {
                                                $set: newSettings.uploadDate,
                                            },
                                        },
                                    }))}
                                    onDone={() => setFiles(update(files, {
                                        $splice: [
                                            [index, 1],
                                        ],
                                    }))}
                                    onDelete={() => setFiles(update(files, {
                                        $splice: [
                                            [index, 1],
                                        ],
                                    }))}
                                />
                            ))}
                        </List>
                        <Box m={2}>
                            <Grid container spacing={1} direction="row">
                                <Grid item>
                                    <PrimaryButton startIcon={<MdFileUpload />} onClick={uploadFiles}>
                                        {t("Hochladen")}
                                    </PrimaryButton>
                                </Grid>
                                {containsImages &&
                                <Grid item>
                                    <FormControlLabel
                                        label={
                                            <>
                                                {t("Bilder komprimieren")}
                                                <IconButton size="small" onClick={() => setShowExplanation(true)}>
                                                    <MdInfoOutline />
                                                </IconButton>
                                            </>
                                        }
                                        control={
                                            <Checkbox
                                                color="primary"
                                                disabled={!supportsWASM}
                                                checked={compressImages}
                                                onChange={event => setCompressImages(event.target.checked)}
                                            />
                                        }
                                    />
                                </Grid>
                                }
                            </Grid>
                            <Typography variant="body2" color="textSecondary">
                                {t("Tippe auf ein Element, um es zu entfernen.")}
                            </Typography>
                        </Box>
                    </>
                }
                onChange={newFiles => setFiles(prevState => [
                    ...prevState,
                    ...Array.from(newFiles).map(file => ({
                        nativeFile: file,
                        uploadDate: dayjs().add(1, "day"),
                    })),
                ])}
            />
            <ExplainDialog
                isOpen={showExplanation}
                onClose={() => setShowExplanation(false)}
                onActivateCompression={() => {
                    setCompressImages(true);
                    setShowExplanation(false);
                }}
            />
        </>
    );
};

export default memo(SubmitFiles);
