import {AutocompleteRenderInputParams, AutocompleteRenderOptionState} from "@material-ui/lab/Autocomplete/Autocomplete";
import React, {ReactNode} from "react";
import {CircularProgress, IconButton, InputAdornment, TextField, TextFieldProps, Typography} from "@material-ui/core";
import {MdFullscreen} from "react-icons/all";
import {useTranslation} from "react-i18next/src";
import {Tooltip} from "components";

export interface IUseRenderers<
    DataType,
    KeyType
    > {
    isFetching: boolean;
    updateIsOpen: (open: boolean) => any;

    getOptionLabel: (element: DataType) => string;
    findElementByKey: (element: KeyType) => DataType | undefined;

    textFieldProps: TextFieldProps;

    customRenderOption?: (option: DataType, state: AutocompleteRenderOptionState) => ReactNode;
    disabled?: boolean;
}

const MORE_AVAILABLE_SYMBOL = Symbol("more-available");

export interface MoreAvailableType {
    [MORE_AVAILABLE_SYMBOL]: true;
    title: string;
}

export interface IUseRenderersResult<
    DataType,
    KeyType
    > {
    renderInput: (params: AutocompleteRenderInputParams) => ReactNode;
    renderOption: (option: DataType, state: AutocompleteRenderOptionState) => ReactNode;
    getTextFromOption: (option: KeyType | DataType | MoreAvailableType) => string;
}

const useRenderers = <
    DataType extends Record<any, any> = Record<any, any>,
    KeyType = string
>({
        textFieldProps,
        isFetching,
        updateIsOpen,
        customRenderOption,
        findElementByKey,
        getOptionLabel,
        disabled,
    }: IUseRenderers<DataType, KeyType>): IUseRenderersResult<DataType, KeyType> => {
    const {t} = useTranslation();

    const getTextFromOption = (option): string => {
        if (typeof option === "string") {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const element = findElementByKey(option);

            if (element) {
                return getOptionLabel(element);
            }
            return option;
        }

        if (MORE_AVAILABLE_SYMBOL in option) {
            return option.title;
        }

        return getOptionLabel(option);
    };

    return {
        renderInput(params) {
            return (
                <TextField
                    {...textFieldProps}
                    {...params}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        ...(textFieldProps?.InputProps || {}),
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <Tooltip title={t("Dialog öffnen").toString()}>
                                    <IconButton disabled={disabled} onClick={() => updateIsOpen(true)}>
                                        <MdFullscreen />
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {isFetching && <CircularProgress size="1rem" color="inherit" />}
                                {params.InputProps.endAdornment}
                            </InputAdornment>
                        ),
                    }}
                />
            );
        },
        renderOption(option, state) {
            if (typeof option === "object" && MORE_AVAILABLE_SYMBOL in option) {
                return (
                    <Typography color="textSecondary" variant="body2" align="center">
                        {option.title}
                    </Typography>
                );
            }

            if (customRenderOption) {
                return customRenderOption(option, state);
            }

            const text = getTextFromOption(option);

            return text;
        },
        getTextFromOption,
    };
};

export default useRenderers;
