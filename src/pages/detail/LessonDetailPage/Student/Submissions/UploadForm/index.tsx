import React, {useContext, useMemo} from "react";
import {List} from "@material-ui/core";
import {DropZone} from "components";
import update from "immutability-helper";
import dayjs from "dayjs";
import getNextLessonDate from "utils/getNextLessonDate";
import {getEndTime, getStartTime} from "utils";

import useFiles from "../../../useFiles";
import SubmissionContext from "../SubmissionContext";
import Footer from "../../../Footer";

import SingleFile from "./SingleFile";
import {SingleFileReference, SubmissionUploadFile} from "./types";

const FILENAME_EXTENSION_REGEX = /^([^\\]*)\.(\w+)$/;
const MAX_FILENAME_LENGTH = 31;

const createFilename = (filename: string): string => {
    const result = FILENAME_EXTENSION_REGEX.exec(filename);

    if (!result) {
        return filename;
    }

    const name = result[1];
    const extension = result[2];

    return `${name.substr(0, MAX_FILENAME_LENGTH - (extension.length + 1))}.${extension}`;
};

const UploadForm = () => {
    const {
        lesson,
    } = useContext(SubmissionContext);
    const {
        setCompressImages,
        compressImages,
        files,
        uploadFiles,
        containsImages,
        setFiles,
        isUploading,
        $files,
    } = useFiles<SubmissionUploadFile>();
    const nextLessonDate = useMemo(() =>
        getNextLessonDate(dayjs(), lesson.course.weekdays.map(weekday => ({
            weekday,
            startTime: dayjs(getStartTime(lesson.startHour)),
            endTime: dayjs(getEndTime(lesson.endHour)),
        }))),
    [lesson]);

    const addFiles = (files: File[]) =>
        setFiles(prevState => [
            ...prevState,
            ...Array.from(files)
                .map(file => ({
                    nativeFile: file,
                    publishDatetime: nextLessonDate,
                    name: createFilename(file.name),
                })),
        ]);

    return (
        <DropZone<SubmissionUploadFile>
            files={files}
            disabled={isUploading}
            renderList={(files) =>
                <>
                    <List>
                        {files.map((file, index) => (
                            <div
                                // eslint-disable-next-line react/no-array-index-key
                                key={`submission_add_${file.nativeFile.name}_${index}`}
                            >
                                <SingleFile
                                    ref={(reference: SingleFileReference) => {
                                        $files.current[index] = reference;
                                    }}
                                    maxLength={MAX_FILENAME_LENGTH}
                                    file={file}
                                    compressImage={compressImages}
                                    onFileChange={newFile => setFiles(prevState => update(prevState, {
                                        [index]: {
                                            $set: newFile,
                                        },
                                    }))}
                                    onRemove={() => setFiles(prevState => update(prevState, {
                                        $splice: [
                                            [index, 1],
                                        ],
                                    }))}
                                />
                            </div>
                        ))}
                    </List>
                    <Footer
                        disabled={isUploading}
                        compressImages={compressImages}
                        containsImages={containsImages}
                        onCompressImagesChange={setCompressImages}
                        onUpload={uploadFiles}
                    />
                </>
            }
            onFilesAdded={addFiles}
        />
    );
};

export default UploadForm;
