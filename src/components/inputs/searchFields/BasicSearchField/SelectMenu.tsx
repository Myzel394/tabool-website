import React, {useEffect, useState} from "react";
import {Box, Dialog, DialogTitle} from "@material-ui/core";
import {useUniqueId} from "hooks";

import List from "./List";
import Search from "./Search";
import FetchingStatus from "./FetchingStatus";
import ErrorStatus from "./ErrorStatus";
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
    onFilter: (search: string) => void;

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
    onFilter,
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

    // Update selected element to given value if opens
    useEffect(() => {
        // Element only needs to be updated when dialog is opened
        if (isOpen) {
            // Only update when value is an element
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
                {isError
                    ? <ErrorStatus />
                    : <>
                        <Search
                            searchPlaceholder={searchPlaceholder}
                            value={searchValue}
                            onSearch={onSearch}
                            onFilter={onFilter}
                            onChange={val => setSearchValue(val)}
                        />
                        {isFetching && <FetchingStatus />}
                        <Box marginY={1}>
                            <List
                                renderListElement={renderListElement}
                                data={data}
                                getKeyFromData={getKeyFromData}
                                selectedKey={selectedElement && getKeyFromData(selectedElement)}
                                itemSize={listItemSize}
                                onSelect={element => setSelectedElement(element)}
                            />
                        </Box>
                        <Actions
                            canConfirm={selectedElement !== undefined}
                            onConfirm={() => onSelect(selectedElement)}
                            onClose={onClose}
                        />
                    </>
                }
            </Box>
        </Dialog>
    );
};

export default SelectMenu;
