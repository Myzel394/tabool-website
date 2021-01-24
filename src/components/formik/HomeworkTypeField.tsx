import React, {memo, useState} from "react";
import {FieldProps} from "formik";
import {AutocompleteProps} from "@material-ui/lab";
import {
    IFetchHomeworkTypeAutocompletionData,
    IFetchHomeworkTypeAutocompletionResponse,
    useFetchHomeworkTypeAutocompletionAPI,
} from "hooks/apis";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {AiFillTool} from "react-icons/all";
import {FormGroup, FormHelperText} from "@material-ui/core";

import {combineAutocompletions} from "../../utils";

import AutocompleteField from "./AutocompleteField";


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
    "onChange"> & FieldProps & {
    helperText?: string;
};

const DEFAULT_TYPES = [
    "Wiederholung", "Vorbereitung", "Hausaufgabe", "Übung",
];

const HomeworkTypeField = ({
    field,
    form,
    helperText,
    ...other
}: IHomeworkTypeField) => {
    const fetchHomework = useFetchHomeworkTypeAutocompletionAPI();

    const [search, setSearch] = useState<string | null>(null);

    const error = form.errors[field.name];

    const {
        data,
        isLoading,
    } = useQuery<IFetchHomeworkTypeAutocompletionResponse, AxiosError, IFetchHomeworkTypeAutocompletionData>(
        ["fetch_homework_type", search],
        () => fetchHomework({
            query: search ?? undefined,
        }),
    );

    return (
        <FormGroup>
            <AutocompleteField
                {...field}
                {...other}
                multiple={false}
                isLoading={isLoading}
                autocompletionList={combineAutocompletions(data?.results, DEFAULT_TYPES)}
                startIcon={<AiFillTool />}
                onSearchChange={setSearch}
                onChange={value =>
                    field.onChange({
                        target: {
                            name: field.name,
                            value,
                        },
                    })
                }
            />
            <FormHelperText>
                {(form.touched[field.name] && error) ? error : helperText}
            </FormHelperText>
        </FormGroup>
    );
};

export default memo(HomeworkTypeField);
