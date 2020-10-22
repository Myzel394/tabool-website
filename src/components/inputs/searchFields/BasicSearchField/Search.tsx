import React, {memo} from "react";
import {useSaveData} from "hooks";
import {IoIosSpeedometer, MdSearch} from "react-icons/all";
import {PrimaryButton} from "components/buttons";
import {Box, Tooltip, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";

import InputWithIcon from "../../InputWithIcon";

export interface ISearch {
    searchPlaceholder: string;
    onSearch: (value: string) => void;
    onFilter: (value: string) => void;

    value: string;
    onChange: (value: string) => void;
}

const Search = ({searchPlaceholder, onSearch, onFilter, onChange, value}: ISearch) => {
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
        onFilter(val);

        if (!saveData) {
            onSearch(val);
        }
    };

    return (
        <>
            <InputWithIcon
                renderIcon={props => <MdSearch {...props} />}
                value={value}
                placeholder={searchPlaceholder}
                onChange={handleChange}
            />
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
