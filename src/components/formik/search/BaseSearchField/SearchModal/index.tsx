import React, {Context, useContext} from "react";
import {PrimaryButton, SecondaryButton, SimpleDialog} from "components";
import {useDeviceWidth, useInheritedState} from "hooks";
import {useTranslation} from "react-i18next/src";
import {Box} from "@material-ui/core";

import SearchFieldContext, {ISearchFieldContext} from "../SearchFieldContext";

import SearchFieldConsumerContext, {ISearchFieldConsumerContext} from "./SearchFieldConsumerContext";
import WindowedList from "./WindowedList";
import Search from "./Search";

const modalStyle = {
    height: "80vh",
    width: "100%",
};

const SearchModal = <
    DataType extends Record<any, any> = Record<any, any>,
    KeyType = string
>() => {
    const {t} = useTranslation();
    const {
        selectedKey: parentSelectedKey,
        isOpen,
        onClose,
        required,
        title,
        updateSelectedKey,
        elements,
        hasNextPage,
        isFetching,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    } = useContext<ISearchFieldContext<DataType, KeyType>>(SearchFieldContext);
    const {
        isMD,
    } = useDeviceWidth();

    const [selectedValue, setSelectedValue] = useInheritedState<KeyType | null>(parentSelectedKey);
    const hasSelectedDifferent = selectedValue !== parentSelectedKey;
    const enableSaveSelection = hasSelectedDifferent && (
        (!required) ||
        (required && selectedValue !== null)
    );

    // For Typescript
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ConsumerContext = SearchFieldConsumerContext as Context<ISearchFieldConsumerContext<DataType, KeyType>>;

    return (
        <SimpleDialog
            PaperProps={{
                style: isMD ? modalStyle : undefined,
            }}
            fullScreen={!isMD}
            maxWidth="md"
            isOpen={isOpen}
            title={title}
            primaryButton={
                <PrimaryButton
                    disabled={!enableSaveSelection}
                    onClick={() => {
                        onClose();
                        updateSelectedKey(selectedValue);
                    }}
                >
                    {t("Auswählen")}
                </PrimaryButton>
            }
            secondaryButton={
                <SecondaryButton onClick={onClose}>
                    {t("Abbrechen")}
                </SecondaryButton>
            }
            onClose={onClose}
        >
            <Box display="flex" flexDirection="column" style={{height: "100%"}}>
                <Search <DataType, KeyType> />
                <ConsumerContext.Provider
                    value={{
                        elements,
                        hasNextPage,
                        isFetching,
                        parentSelectedKey,
                        onSelect: setSelectedValue,
                        selectedKey: selectedValue,
                    }}
                >
                    <WindowedList<KeyType>
                        selectedValue={selectedValue}
                        updateSelectedValue={setSelectedValue}
                    />
                </ConsumerContext.Provider>
            </Box>
        </SimpleDialog>
    );
};

export default SearchModal;
