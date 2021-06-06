import React from "react";
import {Dayjs} from "dayjs";
import {ListItemText, Portal, TextField} from "@material-ui/core";
import {MdAdd, MdFileUpload} from "react-icons/all";
import {usePrettyBytes} from "hooks";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {StudentCourseDetail, TeacherCourseDetail} from "types";
import {SecondaryInformation} from "components";

export interface FileInformationProps {
    filename: string;
    size: number;

    uploadDate?: Dayjs | null;
    creationDate?: Dayjs;
    course?: StudentCourseDetail | TeacherCourseDetail;
    warningContainer?: any;
    onFilenameChange?: (newName: string) => void;
    maxLength?: number;
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
    course,
    warningContainer,
    maxLength,
}: FileInformationProps) => {
    const {t} = useTranslation();
    const prettyBytes = usePrettyBytes();

    const containsUnnecessaryInformation = (): boolean => {
        const lowerCase = filename.toLowerCase();

        return Boolean(
            course && (
                lowerCase.includes(course.subject.name.toLowerCase()) ||
                lowerCase.includes(`${course.subject.shortName}${course.courseNumber}`.toLowerCase())
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
                            fullWidth
                            style={textStyle}
                            variant="outlined"
                            size="small"
                            value={filename}
                            inputProps={{
                                maxLength,
                            }}
                            onChange={event => {
                                const givenName = event.target.value;
                                const newName = givenName.replace(NAME_REGEX, "");
                                onFilenameChange(newName);
                            }}
                        />
                    ) : filename
                }
                secondary={
                    <>
                        <SecondaryInformation
                            text={prettyBytes(size)}
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
                        {t("Vermeide unnötige Angaben in Dateinamen wie der Kursname, das Datum, \"AB\", etc.")}
                    </Alert>
                </Portal>
            )}
        </>
    );
};

export default FileInformation;
