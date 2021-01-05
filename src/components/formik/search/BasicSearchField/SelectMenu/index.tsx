import React, {useEffect, useState} from "react";
import {Box, Dialog, DialogTitle} from "@material-ui/core";
import {useUniqueId} from "hooks";

import Search, {ISearch} from "../../../../inputs/Search";

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
    onChange: (data: any) => any;

    selectedKey: KeyType;

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
    onChange,
    searchPlaceholder,
    listItemSize,
    onClose,
    data,
    renderListElement,
    getKeyFromData,
    selectedKey,
    onSearchChange,
    searchValue,
}: ISelectMenu<DataType, KeyType>) => {
    const titleId = useUniqueId();

    const [key, setKey] = useState<KeyType | null>();
    const [element, setElement] = useState<DataType | null>();

    const canConfirm = selectedKey !== undefined && key === undefined || key !== undefined;

    // Update selected element to given value if opens
    useEffect(() => {
        // Element only needs to be updated when dialog is opened
        if (isOpen) {
            // Only update when a value is selected
            if (selectedKey) {
                setKey(selectedKey);
            }
        }
    }, [selectedKey, isOpen]);

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
                    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                    // @ts-ignore
                    selectedKey={key}
                    itemSize={listItemSize}
                    onSelect={newElement => {
                        setElement(newElement);
                        setKey(newElement === null ? null : getKeyFromData(newElement));
                    }}
                />
                <Actions
                    canConfirm={canConfirm}
                    onConfirm={() => onChange({
                        target: {
                            value: key,
                            element,
                        },
                    })}
                    onClose={onClose}
                />
            </Box>
        </Dialog>
    );
};

export default SelectMenu;
