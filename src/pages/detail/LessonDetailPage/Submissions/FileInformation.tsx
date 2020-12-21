import React, {memo} from "react";
import {Dayjs} from "dayjs";
import {ListItemText} from "@material-ui/core";
import prettyBytes from "pretty-bytes";
import {MdAdd, MdFileUpload} from "react-icons/all";

import SecondaryInformation from "./SecondaryInformation";

export interface IFileInformation {
    filename: string;
    size: number;

    uploadDate?: Dayjs | null;
    creationDate?: Dayjs;
}

const style = {
    wordBreak: "break-all" as "break-all",
};

const FileInformation = ({filename, creationDate, size, uploadDate}: IFileInformation) => {
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
                </>
            }
        />
    );
};

export default memo(FileInformation);
