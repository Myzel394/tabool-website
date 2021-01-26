import React, {memo, useContext, useEffect, useMemo, useRef, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {List} from "@material-ui/core";
import {DropZone} from "components";
import update from "immutability-helper";
import {supportsWASM} from "supports";
import {getNextLessonDate} from "utils";
import {LessonDate} from "utils/getNextLessonDate";

import SubmissionsContext from "../SubmissionsContext";

import Element from "./Element";
import Footer from "./Footer";


export interface SubmissionUploadFile {
    nativeFile: File;
    uploadDate: Dayjs | null;
}

const SubmitFiles = () => {
    const {lesson} = useContext(SubmissionsContext);

    const $files = useRef<any[]>([]);
    const [files, setFiles] = useState<SubmissionUploadFile[]>([]);
    const [compressImages, setCompressImages] = useState<boolean>(supportsWASM);

    const nextLessonDate = useMemo(() => {
        const {startTime, endTime, course: {weekdays}} = lesson.lessonData;

        const lessonDates: LessonDate[] = weekdays.map(weekday => ({
            weekday,
            startTime,
            endTime,
        }));

        return getNextLessonDate(dayjs(), lessonDates);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lesson.lessonData.startTime, lesson.lessonData.endTime, lesson.lessonData.course.weekdays, lesson.date]);

    const containsImages = files.some(file => file.nativeFile.type.startsWith("image"));
    const uploadFiles = () => {
        $files.current.forEach(file => file.upload());
    };

    // Update ref length
    useEffect(() => {
        $files.current = Array(files.length);
    }, [files]);

    return (
        <>
            <DropZone<SubmissionUploadFile>
                value={files}
                renderList={(files) =>
                    <>
                        <List>
                            {files.map((file, index) => (
                                <div
                                    key={`submission_add_${file.nativeFile.name}_${file.nativeFile.size}_${file.uploadDate?.toISOString()}`}
                                >
                                    <Element
                                        ref={elementRef => $files.current[index] = elementRef}
                                        nativeFile={file.nativeFile}
                                        compressImages={compressImages}
                                        settings={{
                                            uploadDate: file.uploadDate,
                                        }}
                                        onSettingsChange={newSettings => setFiles(update(files, {
                                            [index]: {
                                                uploadDate: {
                                                    $set: newSettings.uploadDate ?? null,
                                                },
                                            },
                                        }))}
                                        onDone={() => setFiles(update(files, {
                                            $splice: [
                                                [index, 1],
                                            ],
                                        }))}
                                        onDelete={() => setFiles(update(files, {
                                            $splice: [
                                                [index, 1],
                                            ],
                                        }))}
                                    />
                                </div>
                            ))}
                        </List>
                        <Footer
                            compressImages={compressImages}
                            containsImages={containsImages}
                            onCompressImagesChange={setCompressImages}
                            onUpload={uploadFiles}
                        />
                    </>
                }
                onChange={newFiles => setFiles(prevState => [
                    ...prevState,
                    ...Array.from(newFiles).map(file => ({
                        nativeFile: file,
                        uploadDate: nextLessonDate,
                    })),
                ])}
            />
        </>
    );
};

export default memo(SubmitFiles);
