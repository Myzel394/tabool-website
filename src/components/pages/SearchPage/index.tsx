import React, {ReactElement, ReactNode, useEffect, useState} from "react";
import {Box, Container, Grid, GridProps, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";

import {SearchBar} from "../../inputs";

export interface ISearchPage<T = any> {
    data?: T[];
    renderElement: (element: T) => ReactElement<GridProps>;
    search: string;
    onSearchChange: (search: string) => any;
}

const SearchPage = ({
    data,
    onSearchChange,
    renderElement,
    search,
}: ISearchPage) => {
    const {t} = useTranslation();
    const [renderedData, setRenderedData] = useState<ReactNode>(null);

    useEffect(() => {
        const handle = async () => {
            setRenderedData(data?.map(renderElement));
        };
        handle();
    }, [data, renderElement]);

    return (
        <Container maxWidth="sm">
            <Box my={3}>
                <Typography variant="h3" component="h1">
                    Titel
                </Typography>
                <Box my={2}>
                    <SearchBar value={search} onChange={onSearchChange} />
                </Box>
                <Grid container spacing={1} direction="column">
                    {renderedData}
                </Grid>
            </Box>
        </Container>
    );
};

export default SearchPage;
