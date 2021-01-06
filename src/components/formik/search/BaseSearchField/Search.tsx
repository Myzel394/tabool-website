import React, {memo} from "react";
import {CircularProgress, InputAdornment, TextField} from "@material-ui/core";
import {MdSearch} from "react-icons/all";
import {useColors} from "hooks";


export interface ISearch {
    onChange: (newValue: string) => void;
    value: string;
    isLoading: boolean;
}


const Search = ({
    onChange,
    value,
    isLoading,
}: ISearch) => {
    const {
        inputIconColor,
    } = useColors();

    return (
        <TextField
            fullWidth
            value={value}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <MdSearch color={inputIconColor} />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        {isLoading && <CircularProgress color="inherit" size="1rem" />}
                    </InputAdornment>
                ),
            }}
            variant="outlined"
            onChange={event => onChange(event.target.value)}
        />
    );
};

export default memo(Search);
