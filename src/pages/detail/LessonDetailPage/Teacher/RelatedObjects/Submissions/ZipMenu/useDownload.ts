import {TeacherSubmissionDetail} from "types";
import {useCallback, useContext, useState} from "react";
import {useTranslation} from "react-i18next";

import RelatedObjectsContext from "../../RelatedObjectsContext";
import {useSnackbar} from "../../../../../../../hooks";

import downloadSubmissionsAsZip, {ZipSubmissionsData} from "./downloadSubmissionsAsZip";

export interface UseDownloadData {
    variant: ZipSubmissionsData["variant"];
    submissions: TeacherSubmissionDetail[];
    compress: boolean;
}

export interface UseDownloadResult {
    download: () => Promise<void>;
    zippedFilesAmount: number;
    isDownloadDone: boolean;
    isHandling: boolean;
}

const useDownload = ({
    submissions,
    variant,
    compress,
}: UseDownloadData): UseDownloadResult => {
    const {t} = useTranslation();
    const {
        lesson,
        lessonDate,
    } = useContext(RelatedObjectsContext);
    const {
        addError,
    } = useSnackbar();

    const [isHandling, setIsHandling] = useState<boolean>(false);
    const [zippedFilesAmount, setZippedFilesAmount] = useState<number>(0);
    const [isDownloadDone, setIsDownloadDone] = useState<boolean>(false);

    const download = useCallback(async () => {
        setIsHandling(true);

        try {
            await downloadSubmissionsAsZip(
                submissions,
                {
                    variant,
                    compress,
                    t,
                    onFileZipped: () => setZippedFilesAmount(prevState => prevState + 1),
                    onZipDone: () => setIsDownloadDone(true),
                    zipName: `${lesson.course.name} (${lessonDate.format("l")})`,
                },
            );
        } catch {
            addError(undefined, t("Es gab ein Fehler beim zippen. Eventuell unterstützt dein Browser das Zippen nicht."));
        } finally {
            // Reset
            setIsDownloadDone(false);
            setZippedFilesAmount(0);
            setIsHandling(false);
        }
    },
    [submissions, variant, lesson.course.name, lessonDate, t, addError, compress]);

    return {
        zippedFilesAmount,
        isHandling,
        isDownloadDone,
        download,
    };
};

export default useDownload;
