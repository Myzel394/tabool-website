import React, {memo, useState} from "react";
import {FieldProps} from "formik";
import {useQuery} from "react-query";
import {IFetchRoomResponse, useFetchRoomListAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {Autocomplete, createFilterOptions} from "@material-ui/lab";
import {CircularProgress, InputAdornment, TextField} from "@material-ui/core";
import {Room} from "types";
import {useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {RoomIcon} from "components/icons";

import {IAutocompleteField} from "./AutocompleteField";
import AddPlaceDialog from "./AddPlaceDialog";


export type IPlaceField = Omit<IAutocompleteField,
    "isLoading" |
    "autocompletionList" |
    "startIcon" |
    "onSearchChange" |
    "onChange"
    > & FieldProps & {
    onChange: (event) => any;
    helperText?: string;
};

const filter = createFilterOptions<Room>();

const PlaceField = ({
    field,
    form,
    helperText,
    onChange: onChangeRaw,
    ...other
}: IPlaceField) => {
    const fetchRoom = useFetchRoomListAPI();
    const {addError} = useSnackbar();

    const [search, setSearch] = useState<string | null>(null);
    const [dialog, setDialog] = useState<boolean>(false);

    const {
        data,
        isLoading,
    } = useQuery<IFetchRoomResponse, AxiosError, string>(
        ["fetch_room", search],
        () => (search ? fetchRoom(search) : fetchRoom()),
        {
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorLoading),
        },
    );

    const onChange = value =>
        onChangeRaw({
            target: {
                name: field.name,
                value,
            },
        });

    const error = form.errors[field.name];

    return (
        <>
            <Autocomplete<Room, false, false, true>
                {...field}
                multiple={false}
                {...other}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                freeSolo
                loading={isLoading}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== "") {
                        filtered.push({
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            inputValue: params.inputValue,
                            title: `"${params.inputValue}" hinzufügen`,
                        });
                    }

                    return filtered;
                }}
                id="free-solo-dialog-demo"
                options={data?.results ?? []}
                getOptionLabel={(option) => {
                    if (typeof option === "string") {
                        return option;
                    }
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return option?.inputValue ?? option.place;
                }}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                renderOption={(option) => option.place ?? option.title}
                style={{width: 300}}
                renderInput={params =>
                    <TextField
                        {...params}
                        fullWidth
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <RoomIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    {isLoading && <CircularProgress color="inherit" size="1rem" />}
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        error={Boolean(error)}
                        helperText={error ?? helperText}
                    />
                }
                onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                        setSearch(newValue);
                        setDialog(true);
                    } else if (newValue === null) {
                        setSearch(null);
                    } else if (typeof newValue === "object") {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const typedValue = newValue?.inputValue ?? newValue?.text;

                        if (typedValue) {
                            setSearch(typedValue);
                            setDialog(true);
                        } else {
                            onChange(newValue);
                        }
                    }
                }}
            />
            <AddPlaceDialog
                isOpen={dialog}
                initialValue={search ?? ""}
                onClose={() => setDialog(false)}
                onCreated={place => {
                    setDialog(false);
                    setSearch(place.place);
                    onChange(place);
                }}
            />
        </>
    );
};

export default memo(PlaceField);
