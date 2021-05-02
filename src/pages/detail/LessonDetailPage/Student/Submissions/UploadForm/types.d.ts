import {Dayjs} from "dayjs";

export interface SubmissionUploadFile {
    nativeFile: File;
    publishDatetime: Dayjs | null;
    name: string;
}

export interface SingleFileReference {
    nativeFile: File;
    isCompressing: boolean;
    isUploading: boolean;
    upload: () => Promise<void>;
}

