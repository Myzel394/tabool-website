import React, {forwardRef, useContext, useImperativeHandle, useRef, useState} from "react";
import {Dayjs} from "dayjs";
import {useFileUpload} from "hooks";
import {useCreateTeacherMaterialAPI} from "hooks/apis";
import {IconButton, ListItem, ListItemIcon, ListItemSecondaryAction} from "@material-ui/core";
import {MdSettings} from "react-icons/all";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {getTextForState} from "hooks/useFileUpload";
import {ExtensionAvatar, FileInformation, LoadingOverlay} from "components";
import update from "immutability-helper";

import RelatedObjectsContext from "../../RelatedObjectsContext";

import SettingsModal from "./SettingsModal";


export interface MaterialFile {
    nativeFile: File;
    name: string;
    publishDatetime: Dayjs;
    announce: boolean;
}

export interface SingleFileProps {
    onRemove: () => any;
    onChange: (newMaterialFile: MaterialFile) => any;
    material: MaterialFile;

    compressImage: boolean;
}

const FILENAME_MAX_LENGTH = 31;

const SingleFile = ({
    material,
    onChange,
    onRemove,
    compressImage,
}: SingleFileProps, reference) => {
    const {
        updateLesson,
        lesson,
        lessonDate,
    } = useContext(RelatedObjectsContext);
    const {t} = useTranslation();
    const sendMaterial = useCreateTeacherMaterialAPI();
    const {
        isReadingFile,
        isProcessing,
        errorMessage,
        isUploaded,
        isCompressing,
        isPreparingUpload,
        isUploading,
        isDoingAnything,
        readFile,
        upload,
        progress = 0,
    } = useFileUpload(
        material.nativeFile,
        sendMaterial,
        {
            shouldCompressImage: compressImage,
        },
        {
            onSuccess: newMaterial => updateLesson(prevState => update(prevState, {
                materials: {
                    $push: [newMaterial],
                },
            })),
        },
    );
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

    const $warningContainer = useRef<any>();

    useImperativeHandle(reference, () => ({
        isCompressing,
        isUploading,
        nativeFile: material.nativeFile,
        upload: async () => {
            const loadedFile = await readFile();

            return upload({
                name,
                lessonDate,
                file: loadedFile,
                publishDatetime: material.publishDatetime,
                announce: material.announce,
                lessonId: lesson.id,
            });
        },
    }));

    return (
        <>
            <LoadingOverlay
                isLoading={isDoingAnything}
                text={getTextForState({
                    isReadingFile,
                    isProcessing,
                    isUploaded,
                    isUploading,
                    isCompressing,
                    isPreparingUpload,
                }, t)}
                value={[1, 0].includes(progress) ? undefined : progress * 100}
            >
                <ListItem>
                    <ListItemIcon onClick={onRemove}>
                        <ExtensionAvatar name={material.name} />
                    </ListItemIcon>
                    <FileInformation
                        maxLength={FILENAME_MAX_LENGTH}
                        filename={material.name}
                        course={lesson.course}
                        size={material.nativeFile.size}
                        warningContainer={$warningContainer.current}
                        onFilenameChange={newName => onChange({
                            ...material,
                            name: newName,
                        })}
                    />
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => setIsSettingsOpen(true)}>
                            <MdSettings />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <div ref={$warningContainer} />
                {errorMessage && (
                    <Alert severity="error">
                        {errorMessage}
                    </Alert>
                )}
            </LoadingOverlay>
            <SettingsModal
                isOpen={isSettingsOpen}
                publishDatetime={material.publishDatetime}
                announce={material.announce}
                lessonColor={lesson.course.subject.userRelation.color}
                lessonDateWeeks={lesson.course.weekdays}
                onClose={() => setIsSettingsOpen(false)}
                onChange={({announce, publishDatetime}) => onChange({
                    ...material,
                    publishDatetime,
                    announce,
                })}
            />
        </>
    );
};

export default forwardRef(SingleFile);
