import React, {useState} from "react";
import {LoadingOverlay} from "components";
import {IconButton, LinearProgress, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import {MdMoreVert} from "react-icons/all";
import {SubmissionDetail} from "types";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";

import FileInformation from "../FileInformation";
import SettingsModal, {ISettingsDialog} from "../SettingsModal";


import MoreSheet from "./MoreSheet";


export interface IElement {
    isLoading: boolean;
    isFileUploading: boolean;
    isFileUploaded: boolean;
    submission: SubmissionDetail;
    iconElement: JSX.Element;

    onDelete: () => any;
    onSettingsChange: ISettingsDialog["onChange"];
    onUploadToScooso: () => any;

    errorMessage?: string | null;
}

const Element = ({
    submission,
    onDelete,
    onSettingsChange,
    iconElement,
    isLoading,
    onUploadToScooso,
    isFileUploading,
    isFileUploaded,
    errorMessage,
}: IElement) => {
    const {t} = useTranslation();

    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);

    return (
        <>
            <LoadingOverlay isLoading={isLoading}>
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
                {errorMessage &&
                    <Alert severity="error">
                        {errorMessage}
                    </Alert>
                }
                {isFileUploaded &&
                    <Alert severity="success">
                        {t("Datei wurde auf Scooso hochgeladen")}
                    </Alert>
                }
                {isFileUploading &&
                    <LinearProgress />
                }
            </LoadingOverlay>
            <SettingsModal
                value={{
                    uploadDate: submission.uploadDate,
                }}
                isOpen={isSettingsOpen}
                onChange={onSettingsChange}
                onClose={() => setIsSettingsOpen(false)}
            />
            <MoreSheet
                submission={submission}
                isOpen={showMore}
                isFileUploading={isFileUploading}
                onClose={() => setShowMore(false)}
                onDelete={onDelete}
                onShowSettings={() => setIsSettingsOpen(true)}
                onUploadToScooso={onUploadToScooso}
            />
        </>
    );
};

export default Element;
