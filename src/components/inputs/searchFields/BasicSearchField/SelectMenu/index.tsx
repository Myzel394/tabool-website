import React, {useEffect, useState} from "react";
import {Box, Dialog, DialogTitle} from "@material-ui/core";
import {useUniqueId} from "hooks";

import Search from "../../../Search";

import ErrorStatus from "./statuses/ErrorStatus";
import List from "./List";
import Actions from "./Actions";

export interface ISelectMenu {
    isOpen: boolean;
    isError: boolean;
    isFetching: boolean;

    title: string;
    searchValue: string;
    searchPlaceholder: string;


    data: any[];
    listItemSize: number;

    onSearch: (value: string) => void;
    onClose: () => void;
    onSelect: (element) => void;

    getKeyFromData: (data: any) => any;
    renderListElement: (element, props, isSelected: boolean) => JSX.Element;

    value: any;
}

const SelectMenu = ({
    isOpen,
    title,
    isError,
    isFetching,
    onSearch,
    onSelect,
    searchPlaceholder,
    listItemSize,
    onClose,
    data,
    renderListElement,
    getKeyFromData,
    value,
}: ISelectMenu) => {
    const titleId = useUniqueId();
    const [selectedElement, setSelectedElement] = useState<any>();
    const [searchValue, setSearchValue] = useState<string>("");
    const canConfirm = value !== undefined && selectedElement === undefined || selectedElement !== undefined;

    // Update selected element to given value if opens
    useEffect(() => {
        // Element only needs to be updated when dialog is opened
        if (isOpen) {
            // Only update when a value is selected
            if (value) {
                setSelectedElement(value);
            }
        }
    }, [value, isOpen]);

    return (
        <Dialog
            fullWidth
            open={isOpen}
            aria-labelledby={titleId}
            onBackdropClick={onClose}
        >
            <Box marginX={3}>
                <DialogTitle id={titleId}>{title}</DialogTitle>
                {isError && <ErrorStatus />}
                <Search
                    searchPlaceholder={searchPlaceholder}
                    value={searchValue}
                    isLoading={isFetching}
                    onSearch={onSearch}
                    onChange={val => setSearchValue(val)}
                />
                <List
                    renderListElement={renderListElement}
                    data={data}
                    getKeyFromData={getKeyFromData}
                    selectedKey={selectedElement && getKeyFromData(selectedElement)}
                    itemSize={listItemSize}
                    onSelect={element => setSelectedElement(element)}
                />
                <Actions
                    canConfirm={canConfirm}
                    onConfirm={() => onSelect(selectedElement)}
                    onClose={onClose}
                />
            </Box>
        </Dialog>
    );
};

export default SelectMenu;
