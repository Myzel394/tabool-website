import React, {forwardRef, useImperativeHandle, useState} from "react";
import {LoadingOverlay} from "components";
import {IconButton, LinearProgress, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import {MdMoreVert} from "react-icons/all";
import {SubmissionDetail} from "types";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {UploadStatus} from "api";

import FileInformation from "../FileInformation";
import SettingsModal from "../SettingsModal";

import MoreSheet from "./MoreSheet";
import useSubmission, {IUseSubmissionResult} from "./useSubmission";


export interface IElement {
    submission: SubmissionDetail;
    iconElement: JSX.Element;

    onDeleted: () => void;
    onUpdate: (newSubmission: SubmissionDetail | void) => void;
    onUploaded: (changed: boolean) => void;
}

export interface ElementReference {
    delete: IUseSubmissionResult["delete"];
    upload: IUseSubmissionResult["upload"];
    resetUploadDate: () => Promise<SubmissionDetail>;
}

const Element = ({
    submission,
    iconElement,
    onUpdate,
    onDeleted,
    onUploaded,
}: IElement, ref) => {
    const {t} = useTranslation();
    const {
        update,
        upload,
        isUpdatingSettings,
        status,
        delete: del,
    } = useSubmission(submission);

    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);

    const isFileUploading = status === UploadStatus.Pending;

    useImperativeHandle(ref, () => ({
        upload,
        delete: del,
        resetUploadDate: () => update({
            uploadDate: null,
        }),
    }));

    return (
        <>
            <LoadingOverlay isLoading={isUpdatingSettings}>
                <ListItem>
                    {iconElement}
                    <FileInformation
                        filename={submission.filename}
                        creationDate={submission.createdAt}
                        uploadDate={submission.uploadDate}
                        size={submission.size}
                        isFileUploading={isFileUploading}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => setShowMore(true)}>
                            <MdMoreVert />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {status === UploadStatus.Uploaded &&
                <Alert severity="success">
                    {t("Datei wurde auf Scooso hochgeladen")}
                </Alert>
                }
                {isFileUploading && <LinearProgress />}
            </LoadingOverlay>
            <SettingsModal
                value={{
                    uploadDate: submission.uploadDate,
                }}
                isOpen={isSettingsOpen}
                onChange={values =>
                    update(values)
                        .then(onUpdate)
                }
                onClose={() => setIsSettingsOpen(false)}
            />
            <MoreSheet
                submission={submission}
                isOpen={showMore}
                isFileUploading={isFileUploading}
                onClose={() => setShowMore(false)}
                onDelete={() =>
                    del()
                        .then(onDeleted)
                }
                onShowSettings={() => setIsSettingsOpen(true)}
                onUploadToScooso={() =>
                    upload()
                        .then(value => onUploaded(Boolean(value)))
                }
            />
        </>
    );
};

export default forwardRef(Element);
