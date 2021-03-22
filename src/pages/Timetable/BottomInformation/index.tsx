import React, {useCallback, useContext, useEffect, useState} from "react";
import {BottomSheet, ShowMoreButton} from "components";
import {Box, Button, CircularProgress, Collapse, Typography} from "@material-ui/core";
import {useAsync} from "hooks";
import {useTranslation} from "react-i18next";
import {MdVisibilityOff} from "react-icons/all";

import TimetableContext from "../TimetableContext";
import filterTimetableForDay from "../filterTimetableForDay";

import BottomContent from "./BottomContent";


const BottomInformation = () => {
    const {t} = useTranslation();
    const {
        selectedDate,
        onSelectedDateChange,
        timetable,
    } = useContext(TimetableContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const getData = useCallback(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        () => filterTimetableForDay(timetable, selectedDate),
        [timetable, selectedDate],
    );

    const {
        value: timetableForDay,
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
                            {timetableForDay
                                ? <BottomContent timetable={timetableForDay} selectedDate={selectedDate} />
                                : (
                                    <Box display="flex" alignItems="center" justifyContent="center" py={3}>
                                        <CircularProgress size="1rem" color="inherit" />
                                        <Box ml={1}>
                                            <Typography variant="body1">
                                                {t("Daten werden geladen")}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )
                            }
                        </Collapse>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexWrap="wrap"
                        >
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
