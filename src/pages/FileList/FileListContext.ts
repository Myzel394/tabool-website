import {createContext} from "react";

interface IFileListContext {
    subtractDownloaded: boolean;
    subtractNotAvailable: boolean;
    rawSearch: string;
    search: string;

    setSubtractDownloaded: (value: boolean) => void;
    setSubtractNotAvailable: (value: boolean) => void;
    setSearch: (value: string) => void;
}

const FileListContext = createContext<IFileListContext>({
    rawSearch: "",
    search: "",
    subtractDownloaded: true,
    subtractNotAvailable: false,

    setSearch: () => null,
    setSubtractDownloaded: () => null,
    setSubtractNotAvailable: () => null,
});

export default FileListContext;
