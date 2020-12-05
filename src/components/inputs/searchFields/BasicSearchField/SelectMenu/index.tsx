import React, {useEffect, useState} from "react";
import {Box, Dialog, DialogTitle} from "@material-ui/core";
import {useUniqueId} from "hooks";

import Search, {ISearch} from "../../../Search";

import ErrorStatus from "./statuses/ErrorStatus";
import List, {IList} from "./List";
import Actions from "./Actions";

export interface ISelectMenu<DataType = any, KeyType = any> {
    isOpen: boolean;
    isError: boolean;
    isFetching: boolean;

    title: string;

    data: DataType[];

    onClose: () => void;
    onSelect: (element: DataType) => void;

    selectedValue: DataType | undefined;

    onSearch: ISearch["onSearch"];
    searchPlaceholder: ISearch["searchPlaceholder"];
    searchValue: ISearch["value"];
    onSearchChange: ISearch["onChange"];

    listItemSize: IList<DataType, KeyType>["itemSize"];
    renderListElement: IList<DataType, KeyType>["renderListElement"];
    getKeyFromData: IList<DataType, KeyType>["getKeyFromData"];
}

const SelectMenu = <DataType extends any = any, KeyType = any>({
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
    selectedValue,
    onSearchChange,
    searchValue,
}: ISelectMenu<DataType, KeyType>) => {
    const titleId = useUniqueId();
    const [selectedElement, setSelectedElement] = useState<any>();
    const canConfirm = selectedValue !== undefined && selectedElement === undefined || selectedElement !== undefined;

    // Update selected element to given value if opens
    useEffect(() => {
        // Element only needs to be updated when dialog is opened
        if (isOpen) {
            // Only update when a value is selected
            if (selectedValue) {
                setSelectedElement(selectedValue);
            }
        }
    }, [selectedValue, isOpen]);

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
                    onChange={val => onSearchChange(val)}
                />
                <List<DataType, KeyType>
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
