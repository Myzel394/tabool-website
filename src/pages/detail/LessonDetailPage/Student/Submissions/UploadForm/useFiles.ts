import {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";
import {supportsWASM} from "supports";
import update from "immutability-helper";

import {SingleFileReference, SubmissionUploadFile} from "./types";

export interface IUseFilesResult {
    files: SubmissionUploadFile[];
    setFiles: Dispatch<SetStateAction<SubmissionUploadFile[]>>;
    compressImages: boolean;
    setCompressImages: (compressImages: boolean) => void;

    containsImages: boolean;
    uploadFiles: () => Promise<any>;

    isUploading: boolean;

    $files: MutableRefObject<SingleFileReference[]>;
}

const useFiles = (): IUseFilesResult => {
    const [files, setFiles] = useState<SubmissionUploadFile[]>([]);
    const [compressImages, setCompressImages] = useState<boolean>(supportsWASM);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const $files = useRef<SingleFileReference[]>([]);
    const containsImages = files.some(file => file.nativeFile.type.startsWith("image"));

    const uploadFiles = async () => {
        setIsUploading(true);
        const succeededIndexes = [];

        try {
            await Promise.all(
                $files.current.map(
                    file => file
                        .upload()
                        .then(() => {
                            const index = files.findIndex(givenFile => givenFile.nativeFile === file.nativeFile) as number;
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            succeededIndexes.push(index);
                        }),
                ),
            );
        } finally {
            setIsUploading(false);
        }

        const indexes = succeededIndexes.map((givenIndex, listIndex) => givenIndex - listIndex);
        setFiles(prevState => update(prevState, {
            $splice: indexes.map(index => [index, 1]),
        }));
    };

    useEffect(() => {
        $files.current = Array(files.length).fill(null);
    }, [files]);

    return {
        files,
        setFiles,
        compressImages,
        setCompressImages,
        containsImages,
        uploadFiles,
        isUploading,
        $files,
    };
};

export default useFiles;
