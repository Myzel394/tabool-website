import {useCallback, useState} from "react";
import compressImage from "browser-image-compression";
import {useTranslation} from "react-i18next";

export interface UseReadFileOptions {
    shouldCompressImage: boolean;
    compressImageOptions: any;
}

export interface UseReadFileResponse {
    progress?: number;
    errorMessage?: string;

    isReadingFile: boolean;
    isCompressing: boolean;

    readFile: () => Promise<Blob>;
}

const COMPRESS_IMAGE_OPTIONS = {
    maxSizeMB: 1,
    useWebWorker: true,
};

const useReadFile = (
    file: File,
    {
        shouldCompressImage = true,
        compressImageOptions = COMPRESS_IMAGE_OPTIONS,
    }: Partial<UseReadFileOptions> = {},
): UseReadFileResponse => {
    const {t} = useTranslation();

    const [progress, setProgress] = useState<number>();
    const [isReadingFile, setIsReadingFile] = useState<boolean>(false);
    const [isCompressing, setIsCompressing] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const readFile = useCallback(async () => {
        let loadedFile: Blob | null = null;

        // Reset
        setIsReadingFile(false);
        setIsCompressing(false);
        setProgress(0);

        const isImage = file.type.startsWith("image");
        if (shouldCompressImage && isImage) {
            // Compress images
            setIsCompressing(true);

            try {
                loadedFile = await compressImage(file, {
                    ...compressImageOptions,
                    onProgress: progress => setProgress(progress / 100),
                });
            } catch (catchEvent) {
                setErrorMessage(t("Das Bild konnte nicht komprimiert werden."));
                throw catchEvent;
            } finally {
                setProgress(undefined);
                setIsCompressing(false);
            }

        } else {
            // Read file
            setIsReadingFile(true);

            try {
                const arrayBuffer = await file.arrayBuffer();
                loadedFile = new Blob([arrayBuffer], {
                    type: file.type,
                });
            } catch (catchEvent) {
                setErrorMessage(t("Die Datei konnte nicht gelesen werden."));
                throw catchEvent;
            } finally {
                setProgress(undefined);
                setIsReadingFile(false);
            }
        }

        // If no file exists, there was another error
        if (!loadedFile) {
            setErrorMessage(t("Es gab einen Fehler mit der Datei."));
            throw new Error();
        }

        return loadedFile;
    }, [file, compressImageOptions, shouldCompressImage, t]);

    return {
        progress,
        isReadingFile,
        isCompressing,
        errorMessage,
        readFile,
    };
};

export default useReadFile;
