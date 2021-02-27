import React, {Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {List} from "@material-ui/core";
import {DropZone} from "components";
import update from "immutability-helper";
import {supportsWASM} from "supports";
import {getEndTime, getNextLessonDate, getStartTime} from "utils";
import {LessonDate} from "utils/getNextLessonDate";
import {StudentLessonDetail, StudentSubmissionDetail} from "types";

import Element from "./Element";
import Footer from "./Footer";

export interface ISubmitFiles {
    lesson: StudentLessonDetail;
    submissions: StudentSubmissionDetail[];
    lessonDate: Dayjs;
    onSubmissionsChange: Dispatch<SetStateAction<StudentSubmissionDetail[]>>;
}

export interface SubmissionUploadFile {
    nativeFile: File;
    publishDatetime: Dayjs | null;
}

const SubmitFiles = ({
    lesson,
    lessonDate,
    onSubmissionsChange,
    submissions,
}: ISubmitFiles) => {
    const $files = useRef<any[]>([]);
    const [files, setFiles] = useState<SubmissionUploadFile[]>([]);
    const [compressImages, setCompressImages] = useState<boolean>(supportsWASM);

    const nextLessonDate = useMemo(() => {
        const {startHour, endHour, course: {weekdays}} = lesson;
        const startTime = dayjs(getStartTime(startHour));
        const endTime = dayjs(getEndTime(endHour));

        const lessonDates: LessonDate[] = weekdays.map(weekday => ({
            weekday,
            startTime,
            endTime,
        }));

        return getNextLessonDate(dayjs(), lessonDates);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lesson.startHour, lesson.endHour, lesson.course.weekdays, lesson.course.weekdays]);

    const containsImages = files.some(file => file.nativeFile.type.startsWith("image"));
    const uploadFiles = () => {
        $files.current.forEach(file => file.upload());
    };
    const removeFile = (files: SubmissionUploadFile[], index: number) => setFiles(update(files, {
        $splice: [
            [index, 1],
        ],
    }));

    // Update ref
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
                                    key={`submission_add_${file.nativeFile.name}_${file.nativeFile.size}_${file.publishDatetime?.toISOString()}`}
                                >
                                    <Element
                                        ref={elementRef => $files.current[index] = elementRef}
                                        nativeFile={file.nativeFile}
                                        compressImages={compressImages}
                                        publishDatetime={file.publishDatetime}
                                        lesson={lesson}
                                        lessonDate={lessonDate}
                                        submissions={submissions}
                                        onSubmissionsChange={onSubmissionsChange}
                                        onPublishDatetimeChange={async newPublishDatetime => setFiles(update(files, {
                                            [index]: {
                                                publishDatetime: {
                                                    $set: newPublishDatetime,
                                                },
                                            },
                                        }))}
                                        onDone={async () => removeFile(files, index)}
                                        onDelete={async () => removeFile(files, index)}
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
                    ...Array.from(newFiles)
                        .map(file => ({
                            nativeFile: file,
                            publishDatetime: nextLessonDate,
                        })),
                ])}
            />
        </>
    );
};

export default SubmitFiles;
