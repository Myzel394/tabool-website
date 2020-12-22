import React, {memo} from "react";
import {Dayjs} from "dayjs";
import {ListItemText} from "@material-ui/core";
import prettyBytes from "pretty-bytes";
import {MdAdd, MdCloudUpload, MdFileUpload} from "react-icons/all";
import {useTranslation} from "react-i18next";

import SecondaryInformation from "./SecondaryInformation";

export interface IFileInformation {
    filename: string;
    size: number;

    uploadDate?: Dayjs | null;
    creationDate?: Dayjs;
    isFileUploading?: boolean;
}

const style = {
    wordBreak: "break-all" as "break-all",
};

const FileInformation = ({filename, creationDate, size, uploadDate, isFileUploading}: IFileInformation) => {
    const {t} = useTranslation();

    return (
        <ListItemText
            style={style}
            primary={filename}
            secondary={
                <>
                    <SecondaryInformation
                        text={prettyBytes(size, {
                            locale: "de",
                        })}
                    />
                    {creationDate &&
                        <SecondaryInformation
                            icon={<MdAdd />}
                            text={creationDate.format("lll")}
                        />
                    }
                    {uploadDate &&
                    <SecondaryInformation
                        icon={<MdFileUpload />}
                        text={uploadDate.format("lll")}
                    />
                    }
                    {isFileUploading &&
                        <SecondaryInformation
                            icon={<MdCloudUpload />}
                            text={t("Wird gerade auf Scooso hochgeladen")}
                        />
                    }
                </>
            }
        />
    );
};

export default memo(FileInformation);
