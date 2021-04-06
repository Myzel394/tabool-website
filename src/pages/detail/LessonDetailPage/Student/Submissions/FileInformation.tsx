import React, {memo} from "react";
import {Dayjs} from "dayjs";
import {ListItemText, Portal, TextField} from "@material-ui/core";
import prettyBytes from "pretty-bytes";
import {MdAdd, MdFileUpload} from "react-icons/all";
import {useInheritedState} from "hooks";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {StudentLessonDetail} from "types";

import SecondaryInformation from "./SecondaryInformation";

export interface IFileInformation {
    filename: string;
    size: number;

    uploadDate?: Dayjs | null;
    creationDate?: Dayjs;
    lesson?: StudentLessonDetail;
    warningContainer?: any;
    onFilenameChange?: (newName: string) => void;
}

const style = {
    wordBreak: "break-all" as "break-all",
};

const textStyle = {
    maxWidth: "95%",
};

const NAME_REGEX = /[^a-z0-9() \-_.]/gi;

const FileInformation = ({
    filename,
    creationDate,
    size,
    uploadDate,
    onFilenameChange,
    lesson,
    warningContainer,

}: IFileInformation) => {
    const {t} = useTranslation();

    const [name, setName] = useInheritedState<string>(filename);

    const extension = filename.split(".").pop() ?? "";
    const containsUnnecessaryInformation = (): boolean => {
        const lowerCase = name.toLowerCase();

        return Boolean(
            // Course
            lesson && (
                lowerCase.includes(lesson.course.subject.name.toLowerCase()) ||
                lowerCase.includes(`${lesson.course.subject.shortName}${lesson.course.courseNumber}`.toLowerCase())
            ),
        );
    };

    return (
        <>
            <ListItemText
                style={style}
                primary={
                    onFilenameChange ? (
                        <TextField
                            style={textStyle}
                            variant="outlined"
                            size="small"
                            value={name}
                            onChange={event => {
                                const givenName = event.target.value;
                                const newName = givenName.replace(NAME_REGEX, "");
                                setName(newName);
                            }}
                            onBlur={() => {
                                const nameWithExtension = name.endsWith(`.${extension.toLowerCase()}`)
                                    ? name
                                    : `${name}.${extension.toLowerCase()}`;

                                setName(nameWithExtension);
                                onFilenameChange(nameWithExtension);
                            }}
                        />
                    ) : filename
                }
                secondary={
                    <>
                        <SecondaryInformation
                            text={prettyBytes(size, {
                                locale: "de",
                            })}
                        />
                        {creationDate && (
                            <SecondaryInformation
                                icon={<MdAdd />}
                                text={creationDate.format("lll")}
                            />
                        )}
                        {uploadDate && (
                            <SecondaryInformation
                                icon={<MdFileUpload />}
                                text={uploadDate.format("lll")}
                            />
                        )}
                    </>
                }
            />
            {containsUnnecessaryInformation() && (
                <Portal container={warningContainer}>
                    <Alert severity="warning">
                        {t("Vermeide unnötige Angaben in Dateinamen (Kurs, Datum, 'AB', etc.).")}
                    </Alert>
                </Portal>
            )}
        </>
    );
};

export default memo(FileInformation);
