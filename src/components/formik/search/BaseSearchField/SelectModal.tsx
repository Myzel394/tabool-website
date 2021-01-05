import React, {ReactNode, useEffect, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, List} from "@material-ui/core";
import {useTranslation} from "react-i18next";

import {PrimaryButton, SecondaryButton} from "../../../buttons";

import Search, {ISearch} from "./Search";

interface RenderElement {
    onSelect: () => any;
    iSelected: boolean;
}


export interface ISelectModal<DataType extends any, KeyType extends string = string> {
    isOpen: boolean;
    onClose: () => any;

    title: string;
    isLoading: boolean;

    elements: DataType[];
    getKeyFromElement: (element: DataType) => KeyType;
    renderElement: (element: DataType, data: RenderElement) => ReactNode;

    onSelect: (element: DataType | null) => any;

    selectedKey: KeyType;

    nullable?: boolean;

    search: ISearch["value"];
    onSearchChange: ISearch["onChange"];
}


const SelectModal = <DataType extends any = any, KeyType extends string = string>({
    elements,
    getKeyFromElement,
    title,
    isOpen,
    renderElement,
    onClose,
    onSelect,
    nullable,
    onSearchChange,
    search,
    isLoading,
    selectedKey: parentSelectedKey,
}: ISelectModal<DataType, KeyType>) => {
    const {t} = useTranslation();

    const [selectedElement, setSelectedElement] = useState<DataType | null>(null);

    const canConfirm = (() => {
        if (nullable) {
            return Boolean(selectedElement && getKeyFromElement(selectedElement) !== parentSelectedKey);
        }
        return selectedElement !== null && getKeyFromElement(selectedElement) !== parentSelectedKey;
    })();

    // Update selected key
    useEffect(() => {
        for (const element of elements) {
            if (getKeyFromElement(element) === parentSelectedKey) {
                setSelectedElement(element);
                return;
            }
        }
    }, [elements, parentSelectedKey, getKeyFromElement]);

    return (
        <Dialog open={isOpen} onBackdropClick={onClose}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <Search
                    value={search}
                    isLoading={isLoading}
                    onChange={onSearchChange}
                />
                <List>
                    {elements.map(element =>
                        renderElement(element, {
                            onSelect: () => setSelectedElement(element),
                            iSelected: Boolean(selectedElement && getKeyFromElement(element) === getKeyFromElement(selectedElement)),
                        }))}
                </List>
            </DialogContent>
            <DialogActions>
                <SecondaryButton onClick={onClose}>
                    {t("Abbrechen")}
                </SecondaryButton>
                <PrimaryButton disabled={!canConfirm} onClick={() => onSelect(selectedElement)}>
                    {t("Auswählen")}
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
};

export default SelectModal;
