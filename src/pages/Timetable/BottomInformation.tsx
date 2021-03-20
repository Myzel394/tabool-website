import React, {useCallback, useContext, useEffect, useState} from "react";
import {BottomSheet, ShowMoreButton} from "components";
import {Box, Button, CircularProgress, Collapse, Typography} from "@material-ui/core";
import {useAsync} from "hooks";
import {useTranslation} from "react-i18next";
import {MdVisibilityOff} from "react-icons/all";

import BottomContent from "./BottomContent";
import TimetableContext from "./TimetableContext";
import filterTimetableForDay from "./filterTimetableForDay";


const BottomInformation = () => {
    const {t} = useTranslation();
    const {
        selectedDate,
        onSelectedDateChange,
        timetable,
    } = useContext(TimetableContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const getData = useCallback(() => filterTimetableForDay(timetable, selectedDate), [timetable, selectedDate]);
    const {
        value,
    } = useAsync(getData, Boolean(selectedDate));

    useEffect(() => {
        if (!selectedDate) {
            setIsOpen(false);
        }
    }, [selectedDate]);

    return (
        <BottomSheet
            variant="persistent"
            isOpen={Boolean(selectedDate)}
            onClose={() => onSelectedDateChange(null)}
        >
            <>
                {selectedDate && (
                    <>
                        <Box mb={2}>
                            <Typography variant="h5">
                                {selectedDate && selectedDate.format("LL")}
                            </Typography>
                        </Box>
                        <Collapse mountOnEnter unmountOnExit in={isOpen}>
                            {value
                                ? <BottomContent timetable={value} />
                                : (
                                    <Box display="flex" alignItems="center">
                                        <CircularProgress />
                                        <Typography variant="body1">
                                            {t("Daten werden geladen")}
                                        </Typography>
                                    </Box>
                                )
                            }
                        </Collapse>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <ShowMoreButton showMore={isOpen} onClick={() => setIsOpen(prevState => !prevState)} />
                            <Button startIcon={<MdVisibilityOff />} onClick={() => onSelectedDateChange(null)}>
                                {t("Ausblenden")}
                            </Button>
                        </Box>
                    </>
                )}
            </>
        </BottomSheet>
    );
};

export default BottomInformation;
