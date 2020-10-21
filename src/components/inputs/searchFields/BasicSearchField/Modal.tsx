import React, {memo, ReactNode} from "react";
import {Box, CircularProgress, Dialog, DialogActions, DialogTitle, Tooltip, Typography} from "@material-ui/core";
import {PrimaryButton} from "components/buttons";
import {useUniqueId} from "hooks";
import {IoIosSpeedometer, MdSearch} from "react-icons/all";
import {useTranslation} from "react-i18next";

import InputWithIcon from "../../InputWithIcon";

export interface IModal {
    isOpen: boolean;
    title: string;
    isError: boolean;
    isFetching: boolean;
    isLite: boolean;
    onSearch: (value: string) => void;
    onChange: (value: string) => void;
    searchValue: string;
    searchPlaceholder: string;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({
    isOpen,
    title,
    isError,
    isFetching,
    isLite,
    onSearch,
    onChange,
    searchValue,
    searchPlaceholder,
    onClose,
    children,
}: IModal) => {
    const {t} = useTranslation();
    const titleId = useUniqueId();

    const renderIcon = props => <MdSearch {...props} />;
    const handleChange = event => {
        const value = event.target.value;

        onChange(value);

        if (!isLite) {
            onSearch(value);
        }
    };

    const renderState = () => {
        if (isError) {
            return <Typography color="error">{t("Es gab einen Fehler. Versuche es später erneut.")}</Typography>;
        }

        return (
            <>
                <InputWithIcon
                    renderIcon={renderIcon}
                    value={searchValue}
                    placeholder={searchPlaceholder}
                    onChange={handleChange}
                />
                {isLite &&
                    <>
                        <Box display="flex" alignItems="center">
                            <PrimaryButton onClick={() => onSearch(searchValue)}>{t("Suchen")}</PrimaryButton>
                            <Box ml={1}>
                                <Tooltip
                                    title={t("Um Daten zu sparen wird die Liste der Daten nicht automatisch aktualisiert.").toString()}
                                    enterTouchDelay={0}
                                    leaveTouchDelay={5000}
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
                    </>
                }
                {isFetching &&
                    <Box display="flex" alignItems="center" marginY={2} >
                        <CircularProgress />
                        <Box ml={1}>
                            <Typography color="textSecondary">{t("Neue Daten werden geladen")}</Typography>
                        </Box>
                    </Box>
                }
                {children}
            </>
        );
    };

    return (
        <Dialog
            open={isOpen}
            aria-labelledby={titleId}
            onBackdropClick={onClose}
        >
            <Box marginX={4}>
                <DialogTitle id={titleId}>{title}</DialogTitle>
                {renderState()}
                <DialogActions>
                    <PrimaryButton onClick={onClose}>{t("Schließen")}</PrimaryButton>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default memo(Modal);
