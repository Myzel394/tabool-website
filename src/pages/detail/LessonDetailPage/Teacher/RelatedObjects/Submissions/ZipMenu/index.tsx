import React, {useState} from "react";
import {TeacherSubmissionDetail} from "types";
import {LoadingOverlay, PrimaryButton, SimpleDialog} from "components";
import {useTranslation} from "react-i18next";
import {AiFillFileZip} from "react-icons/all";
import {
    Box, Checkbox,
    FormControl, FormControlLabel, InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";
import {useDeviceWidth} from "hooks";

import {ZipSubmissionsData} from "./downloadSubmissionsAsZip";
import ZipPreview from "./ZipPreview";
import SelectMenu from "./SelectMenu";
import useDownload from "./useDownload";

export interface ZipMenuProps {
    submissions: TeacherSubmissionDetail[];

    isOpen: boolean;
    onClose: () => any;
}

const ZipMenu = ({
    submissions,
    isOpen,
    onClose,
}: ZipMenuProps) => {
    const {t} = useTranslation();
    const {isSM} = useDeviceWidth();

    const [variant, setVariant] = useState<ZipSubmissionsData["variant"]>("folder");
    const [selectedIds, setSelectedIds] = useState(() => new Set(submissions.map(submission => submission.id)));
    const [compress, setCompress] = useState<boolean>(true);
    const selectedSubmissions = submissions.filter(submission => selectedIds.has(submission.id));

    const {
        download,
        isDownloadDone,
        isHandling,
        zippedFilesAmount,
    } = useDownload({
        submissions: selectedSubmissions,
        variant,
        compress,
    });

    const toggleId = (id: string) => {
        setSelectedIds(prevState => {
            const copiedIds = new Set(Array.from(prevState));

            if (selectedIds.has(id)) {
                copiedIds.delete(id);
            } else {
                copiedIds.add(id);
            }

            return copiedIds;
        });
    };

    return (
        <SimpleDialog
            fullScreen={!isSM}
            title={t("Zip runterladen")}
            isOpen={isOpen}
            primaryButton={
                <PrimaryButton
                    disabled={selectedIds.size === 0}
                    startIcon={<AiFillFileZip />}
                    onClick={download}
                >
                    {t("Zip runterladen")}
                </PrimaryButton>
            }
            onClose={onClose}
        >
            <LoadingOverlay
                isLoading={isHandling}
                value={(() => {
                    if (isDownloadDone) {
                        return undefined;
                    } else {
                        return zippedFilesAmount / selectedSubmissions.length * 100;
                    }
                })()}
                text={(() => {
                    if (isDownloadDone) {
                        return t("Dateien werden zusammengefasst");
                    } else {
                        return t("Dateien werden runtergeladen. {{amount}} / {{full}}", {
                            amount: zippedFilesAmount,
                            full: selectedSubmissions.length,
                        });
                    }
                })()}
            >
                <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                >
                    <ZipPreview variant={variant} submissions={selectedSubmissions} />
                    <Box mt={5}>
                        <Box mb={2}>
                            <FormControl variant="outlined">
                                <InputLabel>
                                    {t("Dateien anordnen")}
                                </InputLabel>
                                <Select
                                    label={t("Dateien anordnen")}
                                    value={variant}
                                    onChange={event => setVariant(event.target.value as ZipSubmissionsData["variant"])}
                                >
                                    <MenuItem value="folder">{t("Unterordner erstellen")}</MenuItem>
                                    <MenuItem value="prefix">{t("Präfixe anhängen")}</MenuItem>
                                    <MenuItem value="extension">{t("Ordner für Dateitypen erstellen")}</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <SelectMenu
                            availableSubmissions={submissions}
                            selectedIds={selectedIds}
                            onToggle={toggleId}
                        />
                        <FormControlLabel
                            label={t("Komprimieren")}
                            control={
                                <Checkbox
                                    checked={compress}
                                    onChange={event => setCompress(event.target.checked)}
                                />
                            }
                        />
                    </Box>
                </Box>
            </LoadingOverlay>
        </SimpleDialog>
    );
};

export default ZipMenu;
