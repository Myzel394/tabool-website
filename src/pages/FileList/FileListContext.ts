import {createContext} from "react";
import {StudentMaterialDetail} from "types";

export interface IFileListContext {
    subtractDownloaded: boolean;
    subtractNotAvailable: boolean;
    rawSearch: string;
    search: string;

    setSubtractDownloaded: (value: boolean) => void;
    setSubtractNotAvailable: (value: boolean) => void;
    setSearch: (value: string) => void;

    // Helps avoiding unnecessary queries
    // When there is no initialData available, there is no need to search for a file.
    $initialData: {
        current: Record<string, {
            materials: StudentMaterialDetail[];
            hasNextPage: boolean;
        }>;
    };
}

const FileListContext = createContext<IFileListContext>({
    rawSearch: "",
    search: "",
    subtractDownloaded: true,
    subtractNotAvailable: false,

    setSearch: () => null,
    setSubtractDownloaded: () => null,
    setSubtractNotAvailable: () => null,
    $initialData: {
        current: {},
    },
});

export default FileListContext;
