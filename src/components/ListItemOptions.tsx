import React, {ReactNode} from "react";
import {Dayjs} from "dayjs";
import {LinearProgress, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {MdFileDownload} from "react-icons/all";
import {useTranslation} from "react-i18next";

import {BottomSheetAction, ICON_SIZE} from "./components";
import DueDateChanger, {DueDateChangerProps} from "./DueDateChanger";
import DeleteConfirmItem from "./DeleteConfirmItem";

interface Base {
    children: ReactNode;
    title: string;

    isOpen: boolean;
    onClose: () => any;

    isUpdating?: boolean;

    extraFields?: ReactNode;

    description?: string;
}

interface WithDownload {
    downloadLink: string;
    downloadTitle?: string;
}

interface WithDelete {
    onDelete: () => any;
    isDeleting: boolean;

    deleteConfirmChildren?: ReactNode;
}

interface PublishDatetimeBase {
    lessonWeekdays: number[];
    lessonColor: string;

    publishDatetimeTitle?: string;
    pickerType: DueDateChangerProps["pickerType"];
}

interface WithPublishDatetimeGuaranteed extends PublishDatetimeBase {
    date: Dayjs;
    onDateChange: (newDate: Dayjs) => any;

    allowDatetimeNull?: false;
}

interface WithPublishDatetimeOrNull extends PublishDatetimeBase {
    date: Dayjs | null;
    onDateChange: (newDate: Dayjs | null) => any;

    allowDatetimeNull: true;
}

export type ListItemOptionsProps = Base & (WithPublishDatetimeGuaranteed | WithPublishDatetimeOrNull) & WithDelete & WithDownload;

const ListItemOptions = ({
    allowDatetimeNull,
    downloadLink,
    isDeleting,
    isUpdating,
    onDateChange,
    onDelete,
    date,
    children,
    isOpen,
    onClose,
    title,
    extraFields,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    lessonWeekdays,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    lessonColor,
    deleteConfirmChildren,
    downloadTitle,
    publishDatetimeTitle,
    pickerType,
    description,
}: ListItemOptionsProps) => {
    const {t} = useTranslation();

    return (
        <>
            <ListItem>
                {children}
            </ListItem>
            {(isUpdating || isDeleting) && <LinearProgress />}
            <BottomSheetAction
                isOpen={isOpen}
                title={title}
                description={description}
                onClose={onClose}
            >
                {downloadLink && (
                    <ListItem
                        button
                        download
                        disabled={isDeleting}
                        component="a"
                        href={downloadLink}
                        target="_blank"
                    >
                        <ListItemIcon>
                            <MdFileDownload size={ICON_SIZE} />
                        </ListItemIcon>
                        <ListItemText primary={downloadTitle || t("Download")} />
                    </ListItem>
                )}

                {date && (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    <DueDateChanger
                        pickerType={pickerType}
                        disabled={isUpdating}
                        weekdays={lessonWeekdays}
                        color={lessonColor}
                        title={publishDatetimeTitle || t("Hochladedatum ändern")}
                        isLoading={Boolean(isUpdating)}
                        disableClearing={!allowDatetimeNull}
                        date={date}
                        onChange={onDateChange}
                    />
                )}

                {extraFields}

                {onDelete && (
                    <DeleteConfirmItem
                        isDeleting={isDeleting}
                        onDelete={onDelete}
                    >
                        {deleteConfirmChildren}
                    </DeleteConfirmItem>
                )}
            </BottomSheetAction>
        </>
    );
};

export default ListItemOptions;
