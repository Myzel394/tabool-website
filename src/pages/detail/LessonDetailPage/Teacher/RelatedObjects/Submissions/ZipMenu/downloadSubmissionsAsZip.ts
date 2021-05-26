import {TeacherSubmissionDetail} from "types";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import FileSaver from "file-saver";
import {TFunction} from "i18next";
import {getExtension} from "utils";

export interface ZipSubmissionsData {
    variant: "folder" | "prefix" | "extension";
    t: TFunction;

    onFileZipped?: (filename: string) => any;
    onZipDone?: () => any;
    zipName?: string;
    compress?: boolean;
}

export type TYPES = "audio" | "image" | "pdf" | "text" | "word" | "powerpoint" | "excel" | "video" | "math" | "other";

export const EXTENSION_TYPE_MAPPING: Record<string, TYPES> = {
    wav: "audio",
    mp3: "audio",

    jpg: "image",
    jpeg: "image",
    png: "image",
    webp: "image",
    svg: "image",
    gif: "image",

    pdf: "pdf",

    txt: "text",

    doc: "word",
    docx: "word",
    odt: "word",

    ppt: "powerpoint",
    pptx: "powerpoint",
    ppsx: "powerpoint",

    csv: "excel",
    xml: "excel",
    xlsx: "excel",
    xlsm: "excel",
    xltx: "excel",
    xltm: "excel",

    mp4: "video",
    webm: "video",
    mov: "video",
    mkv: "video",
    avi: "video",
    mpeg: "video",

    ggb: "math",
};

export const getTypeFromExtension = (extension: string) => EXTENSION_TYPE_MAPPING[extension] || "other";

export const translateType = (type: TYPES, t: TFunction): string => {
    switch (type) {
        case "audio":
            return t("Audio");
        case "excel":
            return t("Excel");
        case "image":
            return t("Bilder");
        case "math":
            return t("Mathe");
        case "powerpoint":
            return t("Powerpoint");
        case "pdf":
            return t("PDF");
        case "text":
            return t("Text");
        case "video":
            return t("Video");
        case "word":
            return t("Word");
        case "other":
            return t("Andere");
    }
};

const downloadFile = async (url: string): Promise<ArrayBuffer | string> =>
    new Promise((resolve, reject) => {
        JSZipUtils.getBinaryContent(url, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

export const getFilePath = (
    submission: TeacherSubmissionDetail,
    variant: ZipSubmissionsData["variant"],
    t: TFunction,
): string => {
    switch (variant) {
        case "prefix":
            return `${submission.student.firstName}${submission.student.lastName}_${submission.name}`;
        case "folder":
            return `${submission.student.firstName}${submission.student.lastName}/${submission.name}`;
        case "extension": {
            const extension = getExtension(submission.name);
            const type = getTypeFromExtension(extension);
            const folderName = translateType(type, t);

            return `${folderName}/${submission.student.firstName}${submission.student.lastName}_${submission.name}`;
        }
    }
};

const downloadSubmissionsAsZip = async (
    submissions: TeacherSubmissionDetail[],
    {
        variant,
        onFileZipped,
        onZipDone,
        compress,
        zipName = "download.zip",
        t,
    }: ZipSubmissionsData,
) => {
    const zip = new JSZip();

    const downloadAndZip = async (submission: TeacherSubmissionDetail) => {
        // Download files
        // Get binary content
        const binaryContent = await downloadFile(submission.file);
        const path = getFilePath(submission, variant, t);

        // Zip
        zip.file(
            path,
            binaryContent,
            {
                binary: true,
            },
        );
        onFileZipped?.(submission.name);
    };

    await Promise.all(submissions.map(downloadAndZip));

    onZipDone?.();

    await zip
        .generateAsync({
            type: "blob",
            compression: compress ? "DEFLATE" : "STORE",
            compressionOptions: compress ? {
                level: 9,
            } : undefined,
        })
        // Save
        .then((blob) => FileSaver.saveAs(blob, zipName));
};

export default downloadSubmissionsAsZip;
