import React, {ReactNode, useEffect, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {useTranslation} from "react-i18next";

import {PrimaryButton, SecondaryButton} from "../../../buttons";

import Search, {ISearch} from "./Search";

export interface RenderElement<DataType, KeyType extends string = string> {
    onElementSelect: (element: DataType) => any;
    selectedKey: KeyType | null;
    selectedElement: DataType | null;
}

export interface ISelectModal<DataType, KeyType extends string = string> {
    isOpen: boolean;
    onClose: () => any;

    title: string;
    isLoading: boolean;

    elements: DataType[];
    getKeyFromElement: (element: DataType) => KeyType;
    renderElement: (data: RenderElement<DataType, KeyType>) => ReactNode;

    onSelect: (element: DataType | null) => any;

    selectedKey: KeyType;

    nullable?: boolean;

    search: ISearch["value"];
    onSearchChange: ISearch["onChange"];
}

const searchWrapper = {
    flex: "0 1 auto",
};

const SelectModal = <DataType, KeyType extends string = string>({
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
            return Boolean(selectedElement);
        }
        return true;
    })();
    const selectedKey = selectedElement ? getKeyFromElement(selectedElement) : null;

    // Update selected key
    useEffect(() => {
        for (const element of elements) {
            if (getKeyFromElement(element) === parentSelectedKey) {
                setSelectedElement(element);
                break;
            }
        }
    }, [elements, parentSelectedKey, getKeyFromElement]);

    return (
        <Dialog fullScreen open={isOpen} onBackdropClick={onClose}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent
                style={searchWrapper}
            >
                <Search
                    value={search}
                    isLoading={isLoading}
                    onChange={onSearchChange}
                />
            </DialogContent>
            <DialogContent>
                {renderElement({
                    selectedElement,
                    onElementSelect: value => {
                        if (getKeyFromElement(value) === selectedKey) {
                            if (nullable) {
                                setSelectedElement(null);
                            }
                        } else {
                            setSelectedElement(value);
                        }
                    },
                    selectedKey: selectedElement ? getKeyFromElement(selectedElement) : null,
                })}
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
