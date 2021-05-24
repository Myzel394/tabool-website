import React, {useContext, useMemo} from "react";
import {List} from "@material-ui/core";
import update from "immutability-helper";
import {DropZone} from "components";
import getNextLessonDate from "utils/getNextLessonDate";
import dayjs from "dayjs";
import {getEndTime, getStartTime} from "utils";

import useFiles from "../../../../useFiles";
import Footer from "../../../../Footer";
import RelatedObjectsContext from "../../RelatedObjectsContext";

import SingleFile, {MaterialFile} from "./SingleFile";

const UploadForm = () => {
    const {
        lesson,
        updateLesson,
    } = useContext(RelatedObjectsContext);
    const {
        $files,
        files,
        uploadFiles,
        compressImages,
        containsImages,
        setCompressImages,
        setFiles,
        isUploading,
    } = useFiles<MaterialFile>();
    const nextLessonDate = useMemo(() =>
        getNextLessonDate(dayjs(), lesson.course.weekdays.map(weekday => ({
            weekday,
            startTime: dayjs(getStartTime(lesson.startHour)),
            endTime: dayjs(getEndTime(lesson.endHour)),
        }))),
    [lesson]);

    return (
        <DropZone<MaterialFile>
            files={files}
            renderList={files => (
                <>
                    <List>
                        {files.map((material, index) => (
                            <div
                                // eslint-disable-next-line react/no-array-index-key
                                key={`submission_add_${material.nativeFile.name}_${index}`}
                            >
                                <SingleFile
                                    ref={(reference: any) => {
                                        $files.current[index] = reference;
                                    }}
                                    material={material}
                                    compressImage={compressImages}
                                    onChange={newMaterial => setFiles(prevState => update(prevState, {
                                        [index]: {
                                            $set: newMaterial,
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
                        compressImages={compressImages}
                        containsImages={containsImages}
                        disabled={isUploading}
                        onCompressImagesChange={setCompressImages}
                        onUpload={uploadFiles}
                    />
                </>
            )}
            onFilesAdded={newFiles => setFiles(oldFiles => [
                ...oldFiles,
                ...Array.from(newFiles).map(file => ({
                    nativeFile: file,
                    name: file.name,
                    announce: true,
                    publishDatetime: nextLessonDate,
                })),
            ])}
        />
    );
};
export default UploadForm;

