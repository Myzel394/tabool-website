import React, {useContext} from "react";
import {Box, CircularProgress, InputAdornment, TextField} from "@material-ui/core";
import {useTranslation} from "react-i18next/src";
import {MdSearch} from "react-icons/all";

import SearchFieldContext, {ISearchFieldContext} from "../SearchFieldContext";


const Search = <
    DataType extends Record<any, any> = Record<any, any>,
    KeyType = string
>() => {
    const {t} = useTranslation();
    const {
        search,
        updateSearch,
        searchPlaceholder,
        isFetching,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    } = useContext(SearchFieldContext) as ISearchFieldContext<DataType, KeyType>;

    return (
        <Box my={2}>
            <TextField
                autoFocus
                fullWidth
                type="search"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <MdSearch />
                        </InputAdornment>
                    ),
                    endAdornment: isFetching && (
                        <InputAdornment position="end">
                            <CircularProgress size="1rem" color="inherit" />
                        </InputAdornment>
                    ),
                }}
                label={t("Suche")}
                placeholder={searchPlaceholder}
                variant="outlined"
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
            />
        </Box>
    );
};

export default Search;
