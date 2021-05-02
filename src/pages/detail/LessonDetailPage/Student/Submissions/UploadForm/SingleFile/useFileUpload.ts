import {Ref, useContext, useImperativeHandle, useState} from "react";
import {useTranslation} from "react-i18next";
import {ICreateStudentSubmissionData, useCreateStudentSubmission} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {StudentSubmissionDetail} from "types";
import compressImage from "browser-image-compression";
import {Dayjs} from "dayjs";

import SubmissionContext from "../../SubmissionContext";
import {SingleFileReference} from "../types";

export interface IUseServer {
    nativeFile: File;
    publishDatetime: Dayjs | null;
    name: string;
    reference: Ref<SingleFileReference>;
    compressImage: boolean;
}

export interface IUseServerResult {
    upload: () => Promise<any>;

    isUploading: boolean;
    isCompressing: boolean;
    isReadingFile: boolean;
    isProcessing: boolean;
    isPreparingUpload: boolean;

    isUploaded: boolean;

    progress: number;
    errorMessage: string;
}

const COMPRESS_IMAGE_OPTIONS = {
    maxSizeMB: 1,
    useWebWorker: true,
};

const useFileUpload = ({
    nativeFile,
    reference,
    publishDatetime,
    name,
    compressImage: shouldCompressImage,
}: IUseServer): IUseServerResult => {
    const {
        onSubmissionsChange,
        lessonDate,
        lesson,
    } = useContext(SubmissionContext);
    const {t} = useTranslation();
    const sendSubmission = useCreateStudentSubmission();

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [isReadingFile, setIsReadingFile] = useState<boolean>(false);
    const [isCompressing, setIsCompressing] = useState<boolean>(false);

    const {
        mutateAsync,
        isLoading: isUploading,
        isSuccess: isUploaded,
    } = useMutation<StudentSubmissionDetail, AxiosError, ICreateStudentSubmissionData>(
        variables => sendSubmission(variables, setProgress),
        {
            onMutate: () => {
                setErrorMessage("");
            },
            onSuccess: (newSubmission) => {
                onSubmissionsChange(submissions => ([
                    ...submissions,
                    newSubmission,
                ]));
            },
            onError: error => setErrorMessage(error.response?.data?.file ?? error.message),
        },
    );

    const upload = async () => {
        let file: Blob | null = null;

        // Reset
        setProgress(0);

        // Image compressing
        const isImage = nativeFile.type.startsWith("image");
        if (shouldCompressImage && isImage) {
            setIsCompressing(true);

            try {
                file = await compressImage(nativeFile, {
                    ...COMPRESS_IMAGE_OPTIONS,
                    onProgress: progress => setProgress(progress / 100),
                });
            } catch (catchEvent) {
                setErrorMessage(t("Das Bild konnte nicht komprimiert werden."));
                throw catchEvent;
            } finally {
                setIsCompressing(false);
            }

        } else {
            setIsReadingFile(true);

            try {
                const arrayBuffer = await nativeFile.arrayBuffer();
                file = new Blob([arrayBuffer], {
                    type: nativeFile.type,
                });
            } catch (catchEvent) {
                setErrorMessage(t("Die Datei konnte nicht gelesen werden."));
                throw catchEvent;
            } finally {
                setIsReadingFile(false);
            }
        }

        if (file) {
            await mutateAsync({
                file,
                name,
                lessonDate,
                publishDatetime,
                lessonId: lesson.id,
            });
        } else {
            setErrorMessage(t("Es gab einen Fehler mit der Datei."));
            throw new Error("File missing");
        }
    };

    useImperativeHandle(reference, () => ({
        isCompressing,
        isUploading,
        upload,
        nativeFile,
    }));

    return {
        isUploading: progress !== 1 && progress !== 0 && isUploading,
        isProcessing: progress === 1 && isUploading,
        isPreparingUpload: progress === 0 && isUploading,
        progress,
        isCompressing,
        isReadingFile,
        errorMessage,
        isUploaded,
        upload,
    };
};

export default useFileUpload;
