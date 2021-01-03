import React, {memo} from "react";
import {Autocomplete, AutocompleteProps, createFilterOptions} from "@material-ui/lab";
import {CircularProgress, InputAdornment, TextField} from "@material-ui/core";
import {useTranslation} from "react-i18next";


export interface IAutocompleteField extends Omit<AutocompleteProps<any, false, any, true>,
    "selectOnFocus" |
    "clearOnBlur" |
    "handleHomeEndKeys" |
    "fullWidth" |
    "freeSolo" |
    "loading" |
    "options" |
    "getOptionLabel" |
    "renderInput" |
    "filterOptions" |
    "onChange"
    > {
    isLoading: boolean;
    autocompletionList: string[];
    onSearchChange: (search: string) => void;
    onChange: (value: string | null) => void;

    startIcon?: JSX.Element;
    label?: string;
    helperText?: string;
    errorMessage?: string;
}

const filter = createFilterOptions();

const AutocompleteField = ({
    isLoading,
    autocompletionList,
    startIcon,
    label,
    errorMessage,
    helperText,
    onSearchChange,
    onChange,
    ...other
}: IAutocompleteField) => {
    const {t} = useTranslation();

    return (
        <Autocomplete
            {...other}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            fullWidth
            freeSolo
            loading={isLoading}
            options={autocompletionList}
            getOptionLabel={(option: any) => option?.text ?? option}
            renderInput={params =>
                <TextField
                    {...params}
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: startIcon,
                        endAdornment: (
                            <InputAdornment position="end">
                                {isLoading && <CircularProgress color="inherit" size="1rem" />}
                            </InputAdornment>
                        ),
                    }}
                    label={label}
                    variant="outlined"
                    error={Boolean(errorMessage)}
                    helperText={errorMessage ? errorMessage : helperText}
                />
            }
            filterOptions={(opts: any[], params) => {
                const options = filter(opts, params);
                const value = params.inputValue;

                // Suggest the creation of a new value
                if (value.length > 0) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    options.push({
                        id: "",
                        text: t("\"{{value}}\" hinzufügen", {
                            value,
                        }),
                        inputValue: value,
                    });
                    onSearchChange(value);
                }

                return options;
            }}
            onChange={(event, newValue: any) => {
                if (typeof newValue === "string") {
                    onChange(newValue);
                } else if (newValue === null) {
                    onChange(null);
                } else if (typeof newValue === "object") {
                    onChange(newValue?.inputValue ?? newValue?.text);
                }
            }}
        />
    );
};

export default memo(AutocompleteField);
