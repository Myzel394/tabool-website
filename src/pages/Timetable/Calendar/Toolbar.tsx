import React, {useContext} from "react";
import {DatePicker} from "@material-ui/pickers";
import {Box, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {FaCaretLeft, FaCaretRight, MdViewComfy, MdViewDay, MdViewWeek} from "react-icons/all";
import {navigate as navigationConstants} from "react-big-calendar/lib/utils/constants";

import TimetableContext from "../TimetableContext";

const style = {
    marginRight: 4,
};

const Toolbar = ({
    onNavigate,
}) => {
    const {t} = useTranslation();
    const {
        view,
        onViewChange,
        date,
        onDateChange,
        onSelectedDateChange,
    } = useContext(TimetableContext);

    const label = t("Ansicht");

    return (
        <Paper>
            <Container maxWidth="md">
                <Box py={3} px={2}>
                    <Grid container spacing={1} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm="auto">
                            <FormControl fullWidth variant="outlined" size="small">
                                <InputLabel>
                                    {label}
                                </InputLabel>
                                <Select
                                    value={view}
                                    label={label}
                                    onChange={event => onViewChange(event.target.value)}
                                >
                                    <MenuItem value="day">
                                        <Box display="flex" alignItems="center">
                                            <MdViewDay style={style} />
                                            {t("Tag")}
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="work_week">
                                        <Box display="flex" alignItems="center">
                                            <MdViewWeek style={style} />
                                            {t("Woche")}
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="month">
                                        <Box display="flex" alignItems="center">
                                            <MdViewComfy style={style} />
                                            {t("Monat")}
                                        </Box>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <Box display="flex" alignItems="center">
                                <IconButton onClick={() => onNavigate(navigationConstants.PREVIOUS)}>
                                    <FaCaretLeft />
                                </IconButton>
                                <DatePicker
                                    size="small"
                                    value={date}
                                    inputVariant="outlined"
                                    onChange={date => {
                                        if (date) {
                                            onDateChange(date);
                                            onSelectedDateChange(date);
                                        }
                                    }}
                                />
                                <IconButton onClick={() => onNavigate(navigationConstants.NEXT)}>
                                    <FaCaretRight />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Paper>
    );
};
export default Toolbar;


