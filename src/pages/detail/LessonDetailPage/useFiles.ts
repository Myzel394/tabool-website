import {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";
import {supportsWASM} from "supports";
import update from "immutability-helper";

export interface IUseFilesResult<Reference, File> {
    files: File[];
    setFiles: Dispatch<SetStateAction<File[]>>;
    compressImages: boolean;
    setCompressImages: (compressImages: boolean) => void;

    containsImages: boolean;
    uploadFiles: () => Promise<any>;

    isUploading: boolean;

    $files: MutableRefObject<Reference[]>;
}

interface HasUploadFunctionReference {
    upload: () => Promise<any>;
    nativeFile: File;
}

interface HasNativeFileFile {
    nativeFile: File;
}

interface DefaultFile {
    nativeFile: File;
    isCompressing: boolean;
    isUploading: boolean;
    upload: () => Promise<void>;
}

const useFiles = <
    File extends HasNativeFileFile,
    Reference extends HasUploadFunctionReference = DefaultFile,
    >(): IUseFilesResult<Reference, File> => {
    const [files, setFiles] = useState<File[]>([]);
    const [compressImages, setCompressImages] = useState<boolean>(supportsWASM);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const $files = useRef<Reference[]>([]);
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
            $splice: indexes.map((index, removeIndex) => [index - removeIndex, 1]),
        }));
    };

    useEffect(() => {
        if ($files.current.length !== files.length) {
            $files.current = Array(files.length).fill(null);
        }
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
