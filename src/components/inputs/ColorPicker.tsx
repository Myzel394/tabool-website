import React from "react";
import {Box, CircularProgress, InputAdornment, makeStyles, TextField} from "@material-ui/core";
import tinycolor from "tinycolor2";
import {useTranslation} from "react-i18next";
import {OutlinedTextFieldProps} from "@material-ui/core/TextField/TextField";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {useDebouncedValue} from "@shopify/react-hooks";
import {useQueryOptions, useUniqueId} from "hooks";
import {IFetchColorResponse, useFetchColorAPI} from "hooks/apis";

const useClasses = makeStyles({
    input: {
        "&::-webkit-color-swatch-wrapper": {
            padding: 0,
        },
        "&::-webkit-color-swatch": {
            border: "none",
        },
        "&::-moz-color-swatch-wrapper": {
            padding: 0,
            border: "none",
        },
        width: "2em",
        height: "2em",
        border: "none",
        padding: 0,
        backgroundColor: "transparent",
    },
});

export interface IColorPicker extends Omit<OutlinedTextFieldProps, "variant"> {
    value: string;
    list?: string[];
}

const ColorPicker = ({
    value,
    onChange,
    InputProps,
    onBlur,
    list,
    ...other
}: IColorPicker) => {
    const {t} = useTranslation();
    const classes = useClasses();
    const queryOptions = useQueryOptions();
    const fetchColor = useFetchColorAPI();
    const id = useUniqueId();

    const searchValue = useDebouncedValue(value, {
        timeoutMs: 100,
    });

    const {
        isLoading,
        data,
    } = useQuery<IFetchColorResponse, AxiosError>(
        ["fetch_color", searchValue],
        () => fetchColor({
            color: searchValue,
        }),
        queryOptions,
    );

    return (
        <Box display="flex">
            <TextField
                {...other}
                disabled
                InputProps={{
                    ...InputProps,
                    startAdornment: (
                        <InputAdornment position="start">
                            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                            <input
                                list={list && id}
                                placeholder={t("test")}
                                type="color"
                                id="subject_color"
                                className={classes.input}
                                value={value}
                                style={{
                                    boxShadow: `0 0.2em .4em .3em ${tinycolor(value)
                                        .setAlpha(0.3)}`,
                                }}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                            {list && (
                                <datalist id={id}>
                                    {list.map(element =>
                                        <option key={element}>
                                            {element}
                                        </option>)}
                                </datalist>
                            )}
                        </InputAdornment>
                    ),
                    endAdornment: isLoading && (
                        <InputAdornment position="end">
                            <CircularProgress size="1rem" color="inherit" />
                        </InputAdornment>
                    ),
                }}
                value={data ? data.name.value : value}
                variant="outlined"
            />
        </Box>
    );
};
export default ColorPicker;


