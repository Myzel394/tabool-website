import React, {useEffect, useRef} from "react";
import {TeacherSubmissionDetail} from "types";
import {Checkbox, FormControlLabel, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {useForceUpdate} from "@shopify/react-hooks";
import {useTranslation} from "react-i18next";
import {HorizontalScrollWrapper} from "components";

export interface SelectMenuProps {
    availableSubmissions: TeacherSubmissionDetail[];

    selectedIds: Set<string>;
    onToggle: (id: string) => any;
}

const SelectMenu = ({
    onToggle,
    selectedIds,
    availableSubmissions,
}: SelectMenuProps) => {
    const {t} = useTranslation();
    const forceUpdate = useForceUpdate();

    const $singleAllCheckbox = useRef<boolean>(selectedIds.size === availableSubmissions.length);

    useEffect(() => {
        if (selectedIds.size !== availableSubmissions.length) {
            $singleAllCheckbox.current = false;
        }
    }, [selectedIds.size, availableSubmissions.length]);

    if ($singleAllCheckbox.current) {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked
                        onChange={() => {
                            $singleAllCheckbox.current = false;
                            forceUpdate();
                        }}
                    />
                }
                label={t("Alle Einsendungen auswählen")}
            />
        );
    }

    return (
        <HorizontalScrollWrapper>
            {availableSubmissions.map(submission =>
                <ListItem
                    key={submission.id}
                    button
                    onClick={() => onToggle(submission.id)}
                >
                    <ListItemIcon>
                        <Checkbox
                            checked={selectedIds.has(submission.id)}
                            onChange={() => onToggle(submission.id)}
                        />
                    </ListItemIcon>
                    <ListItemText
                        style={{
                            width: "max-content",
                        }}
                        primary={`${submission.student.firstName} ${submission.student.lastName}`}
                        secondary={submission.name}
                    />
                </ListItem>)}
        </HorizontalScrollWrapper>
    );
};

export default SelectMenu;
