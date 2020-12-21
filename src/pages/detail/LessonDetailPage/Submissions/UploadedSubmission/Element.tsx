import React, {useState} from "react";
import {LoadingOverlay} from "components";
import {IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import {MdMoreVert} from "react-icons/all";
import {SubmissionDetail} from "types";

import FileInformation from "../FileInformation";
import SettingsModal, {ISettingsDialog} from "../SettingsModal";


import MoreSheet from "./MoreSheet";


export interface IElement {
    isLoading: boolean;
    submission: SubmissionDetail;
    iconElement: JSX.Element;

    onDelete: () => any;
    onSettingsChange: ISettingsDialog["onChange"];
    onUploadToScooso: () => any;
}

const Element = ({
    submission,
    onDelete,
    onSettingsChange,
    iconElement,
    isLoading,
    onUploadToScooso,
}: IElement) => {
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
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => setShowMore(true)}>
                            <MdMoreVert />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
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
                onClose={() => setShowMore(false)}
                onDelete={onDelete}
                onShowSettings={() => setIsSettingsOpen(true)}
                onUploadToScooso={onUploadToScooso}
            />
        </>
    );
};

export default Element;
