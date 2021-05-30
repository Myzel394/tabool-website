import React, {memo, useState} from "react";
import {FieldProps} from "formik";
import {useQuery} from "react-query";
import {IFetchRoomResponse, useFetchRoomDetailAPI, useFetchRoomListAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {Autocomplete, createFilterOptions} from "@material-ui/lab";
import {Box, CircularProgress, InputAdornment, TextField} from "@material-ui/core";
import {Room} from "types";
import {useColors, useQueryOptions, useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {RoomIcon} from "components/icons";

import {IAutocompleteField} from "./AutocompleteField";


export type IPlaceField = Omit<IAutocompleteField,
    "isLoading" |
    "autocompletionList" |
    "startIcon" |
    "onSearchChange" |
    "onChange"> & FieldProps & {
    helperText?: string;
    label?: string;
    onChange?: (place: Room) => any;
};

const filter = createFilterOptions<Room>();

const PlaceField = ({
    field,
    form,
    helperText,
    label,
    onChange,
    ...other
}: IPlaceField) => {
    const {
        inputIconColor,
    } = useColors();
    const queryOptions = useQueryOptions();
    const fetchRoomList = useFetchRoomListAPI();
    const fetchRoom = useFetchRoomDetailAPI();
    const {addError} = useSnackbar();
    const {value} = field;

    const [search, setSearch] = useState<string | null>(null);

    const {
        data,
        isLoading,
    } = useQuery<IFetchRoomResponse, AxiosError>(
        ["fetch_rooms", search],
        () => (search ? fetchRoomList({
            search,
        }) : fetchRoomList()),
        {
            ...queryOptions,
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorLoading),
        },
    );
    const {
        data: placeName,
    } = useQuery<Room, AxiosError>(
        ["fetch_room", value],
        () => fetchRoom(value),
        {
            ...queryOptions,
            enabled: Boolean(value),
        },
    );

    const setNewName = (rawPlaceName: string) => {
        const placeName = rawPlaceName.toLowerCase();

        let searchValue: string;
        let newValue: Room | null = null;

        // Check if already exists
        const place = (() => {
            for (const place of (data?.results ?? [])) {
                if (place.place.toLowerCase() === placeName) {
                    return place;
                }
            }
        })();

        if (place) {
            newValue = place;
            searchValue = place.place;
        } else {
            searchValue = placeName;
        }

        // Update fields
        setSearch(searchValue);

        if (newValue) {
            form.setFieldValue(field.name, newValue.id);
        }
    };

    const error = form.errors[field.name];
    const placeNames = (data?.results ?? []).map(place => place.place.toLowerCase());

    return (
        <Autocomplete<Room, false, false, true>
            {...field}
            multiple={false}
            {...other}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            freeSolo
            value={placeName ?? null}
            loading={isLoading}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== "" && !placeNames.includes(params.inputValue.toLowerCase())) {
                    filtered.push({
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        inputValue: params.inputValue,
                        title: `"${params.inputValue}" hinzufügen`,
                    });
                }

                setSearch(params.inputValue);

                return filtered;
            }}
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
            renderInput={params =>
                <TextField
                    {...params}
                    fullWidth
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <Box ml={2}>
                                    <RoomIcon color={inputIconColor} />
                                </Box>
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
            onChange={(event, value) =>
                setNewName(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    value?.inputValue ?? value?.text ?? value?.place ?? value,
                )
            }
        />
    );
};

export default memo(PlaceField);
