import React, {forwardRef, useImperativeHandle, useState} from "react";
import {LoadingOverlay} from "components";
import {IconButton, LinearProgress, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import {MdMoreVert} from "react-icons/all";
import {StudentLessonDetail, StudentSubmissionDetail} from "types";

import FileInformation from "../FileInformation";
import SettingsModal from "../SettingsModal";

import MoreSheet from "./MoreSheet";
import useSubmission, {IUseSubmissionResult} from "./useSubmission";


export interface IElement {
    submission: StudentSubmissionDetail;
    iconElement: JSX.Element;
    lesson: StudentLessonDetail;

    onDeleted: () => void;
    onUpdate: (newSubmission: StudentSubmissionDetail | void) => void;
}

export interface ElementReference {
    delete: IUseSubmissionResult["delete"];
    resetUploadDate: () => Promise<StudentSubmissionDetail>;
    upload: () => Promise<StudentSubmissionDetail>;
}

const Element = ({
    submission,
    iconElement,
    lesson,
    onUpdate,
    onDeleted,
}: IElement, ref) => {
    const {
        update,
        upload,
        isUploading,
        isUpdating,
        delete: deleteSubmission,
    } = useSubmission(submission);

    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);

    const deleteFile = () => deleteSubmission()
        .then(onDeleted);
    const resetUploadDate = () => update({
        publishDatetime: null,
    })
        .then(onUpdate);
    const uploadFile = () => upload()
        .then(onUpdate);

    useImperativeHandle(ref, () => ({
        resetUploadDate,
        upload: uploadFile,
        delete: deleteFile,
    }));

    return (
        <>
            <LoadingOverlay isLoading={isUpdating}>
                <ListItem>
                    {iconElement}
                    <FileInformation
                        filename={submission.name}
                        creationDate={submission.createdAt}
                        uploadDate={submission.publishDatetime}
                        size={submission.size}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => setShowMore(true)}>
                            <MdMoreVert />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {isUploading && <LinearProgress />}
            </LoadingOverlay>
            <SettingsModal
                publishDatetime={submission.publishDatetime}
                isOpen={isSettingsOpen}
                lesson={lesson}
                onPublishDatetimeChange={newDatetime =>
                    update({
                        publishDatetime: newDatetime,
                    })
                        .then(onUpdate)
                }
                onClose={() => setIsSettingsOpen(false)}
            />
            <MoreSheet
                submission={submission}
                isOpen={showMore}
                isFileUploading={isUpdating}
                onClose={() => setShowMore(false)}
                onDelete={deleteFile}
                onUpload={uploadFile}
                onShowSettings={() => setIsSettingsOpen(true)}
            />
        </>
    );
};

export default forwardRef(Element);
