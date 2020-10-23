import React, {memo} from "react";
import {useSaveData} from "hooks";
import {IoIosSpeedometer, MdSearch} from "react-icons/all";
import {PrimaryButton} from "components/buttons";
import {Box, CircularProgress, Tooltip, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";

import InputWithIcon from "./InputWithIcon";

export interface ISearch {
    isLoading: boolean;
    searchPlaceholder: string;
    onSearch: (value: string) => void;

    value: string;
    onChange: (value: string) => void;
}

const Search = ({searchPlaceholder, onSearch, onChange, value, isLoading}: ISearch) => {
    const {t} = useTranslation();
    const saveData = useSaveData();

    const loadDataButtonTitle = t("Neuladen");
    const tooltipTitle = t(
        "Um Daten zu sparen verläuft die Suche lokal mit den zwischengespeicherten Daten. " +
        `Wenn du die Daten vom Server neu laden möchtest, klicke auf "${loadDataButtonTitle}".`,
    );

    const handleChange = event => {
        const val = event.target.value;

        onChange(val);

        if (!saveData) {
            onSearch(val);
        }
    };

    return (
        <>
            <Box display="flex" alignItems="center">
                <Box mr={1}>
                    <InputWithIcon
                        fullWidth
                        renderIcon={props => <MdSearch {...props} />}
                        value={value}
                        placeholder={searchPlaceholder}
                        type="search"
                        onChange={handleChange}
                    />
                </Box>
                {isLoading && <CircularProgress />}
            </Box>
            {saveData &&
                <Box display="flex" alignItems="center">
                    <PrimaryButton onClick={() => onSearch(value)}>
                        {loadDataButtonTitle}
                    </PrimaryButton>
                    <Box ml={1}>
                        <Tooltip
                            title={tooltipTitle.toString()}
                            enterTouchDelay={0}
                            leaveTouchDelay={10000}
                        >
                            <Typography color="textSecondary" align="left">
                                <Box display="flex" alignItems="center">
                                    <IoIosSpeedometer color="textSecondary" />
                                    {t("Datensparmodus aktiv")}
                                </Box>
                            </Typography>
                        </Tooltip>
                    </Box>
                </Box>
            }
        </>
    );
};

export default memo(Search);
