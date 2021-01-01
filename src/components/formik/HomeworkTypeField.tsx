import React, {memo, useState} from "react";
import {FieldProps} from "formik";
import {Autocomplete, AutocompleteProps} from "@material-ui/lab";
import {
    IFetchHomeworkTypeAutocompletionData,
    IFetchHomeworkTypeAutocompletionResponse,
    useFetchHomeworkTypeAutocompletionAPI,
} from "hooks/apis";
import {useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {CircularProgress, InputAdornment, TextField} from "@material-ui/core";
import {AiFillTool} from "react-icons/all";
import {useTranslation} from "react-i18next";


export type IHomeworkTypeField = Omit<AutocompleteProps<any, false, any, true>,
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
    > & FieldProps & {
    helperText?: string;
};


const HomeworkTypeField = ({
    field,
    form,
    helperText,
    ...other
}: IHomeworkTypeField) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchOptions = useFetchHomeworkTypeAutocompletionAPI();

    const [search, setSearch] = useState<string | null>(null);

    const {
        data,
        isLoading,
    } = useQuery<IFetchHomeworkTypeAutocompletionResponse, AxiosError, IFetchHomeworkTypeAutocompletionData>(
        ["fetch_homework_type_autocompletion", search],
        () => fetchOptions({
            query: search ?? "",
        }),
        queryOptions,
    );
    const autocompletion = data?.results ?? [];

    const hasError = Boolean(form.errors[field.name]);
    const setValue = (value: string | null) => field.onChange({
        target: {
            name: field.name,
            value,
        },
    });


    return (
        <Autocomplete
            {...field}
            {...other}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            fullWidth
            freeSolo
            loading={isLoading}
            options={autocompletion.map(text => ({
                text,
            }))}
            getOptionLabel={(option: any) => option?.text ?? option}
            renderInput={params =>
                <TextField
                    {...params}
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <AiFillTool />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {isLoading && <CircularProgress color="inherit" size="1rem" />}
                            </InputAdornment>
                        ),
                    }}
                    label={t("Typ")}
                    variant="outlined"
                    error={hasError}
                    helperText={hasError ? form.errors[field.name] : helperText}
                />
            }
            filterOptions={(opts: any[], params) => {
                const options = [...autocompletion];
                const value = params.inputValue;

                // Suggest the creation of a new value
                if (value.length > 0) {
                    options.push({
                        id: "",
                        text: t("\"{{value}}\" hinzufügen", {
                            value,
                        }),
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        inputValue: value,
                    });
                    setSearch(value);
                }

                return options;
            }}
            onChange={(event, newValue: any) => {
                if (typeof newValue === "string") {
                    setValue(newValue);
                } else if (newValue === null) {
                    setValue(null);
                } else if (typeof newValue === "object") {
                    setValue(newValue?.inputValue ?? newValue?.text);
                }
            }}
        />
    );
};

export default memo(HomeworkTypeField);
