import React, {memo} from "react";
import {Box, Button, ButtonGroup, InputBase, InputBaseProps, Paper, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {FaFilter, FaSortAlphaDownAlt, MdSearch} from "react-icons/all";

export interface ISearchBar extends Omit<InputBaseProps, "onChange"> {
    value: string;
    onChange: (search: string) => any;

    onSearch?: () => any;
    onSortDialogOpen?: () => any;
    onFilterDialogOpen?: () => any;
}

const SearchBar = ({value, onChange, onSortDialogOpen, onFilterDialogOpen, ...other}: ISearchBar) => {
    const {t} = useTranslation();

    return (
        <Paper>
            <Box py={1} px={1} alignItems="center" display="flex">
                <InputBase
                    {...other}
                    fullWidth
                    startAdornment={
                        <Box mx={1}>
                            <MdSearch size={20} />
                        </Box>
                    }
                    endAdornment={(
                        <Paper>
                            <Typography color="textSecondary">
                                <ButtonGroup variant="text" color="default">
                                    {onSortDialogOpen && (
                                        <Button color="inherit" size="large" onClick={onSortDialogOpen}>
                                            <FaSortAlphaDownAlt />
                                        </Button>
                                    )}
                                    {onFilterDialogOpen && (
                                        <Button color="inherit" size="large" onClick={onFilterDialogOpen}>
                                            <FaFilter />
                                        </Button>
                                    )}
                                </ButtonGroup>
                            </Typography>
                        </Paper>
                    )}
                    placeholder={t("Suche")}
                    value={value}
                    inputMode="search"
                    onChange={event => onChange(event.target.value)}
                />
            </Box>
        </Paper>
    );
};

export default memo(SearchBar);
