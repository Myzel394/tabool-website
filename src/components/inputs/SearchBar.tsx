import React, {memo} from "react";
import {Box, InputBase, Paper} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {MdSearch} from "react-icons/all";

export interface ISearchBar {
    value: string;
    onChange: (search: string) => any;

    onSearch?: () => any;
}

const SearchBar = ({value, onChange, onSearch}: ISearchBar) => {
    const {t} = useTranslation();

    return (
        <Paper>
            <Box py={1} px={1}>
                <InputBase
                    placeholder={t("Suche")}
                    value={value}
                    inputMode="search"
                    onChange={event => onChange(event.target.value)}
                />
                {onSearch && (
                    <MdSearch />
                )}
            </Box>
        </Paper>
    );
};

export default memo(SearchBar);
