import React from "react";
import {
    Box,
    Button,
    Checkbox,
    Container, Grid,
    Radio,
    Select,
    Slider,
    Switch,
    TextField,
    Typography,
} from "@material-ui/core";

export default function ShowCase() {
    return (
        <Container maxWidth="sm">
            <Typography variant="h1">Showcase</Typography>
            <section>
                <Typography variant="h3">Buttons</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary">Contained primary</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary">Contained secondary</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" color="primary">Contained secondary</Button>
                    </Grid>
                </Grid>
            </section>
            <section>
                <Typography variant="h3">Inputs</Typography>
                <Box display="flex" flexDirection="column">
                    <Checkbox />
                    <Radio />
                    <Switch />
                    <Slider />
                    <Select />
                </Box>
            </section>
            <section>
                <Typography variant="h3">Text</Typography>
                <Box display="flex" flexDirection="column">
                    <TextField variant="filled" />
                    <TextField variant="outlined" />
                    <TextField variant="standard" />
                </Box>
            </section>
        </Container>
    );
}
