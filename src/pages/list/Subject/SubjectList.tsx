import React, {memo, useCallback} from "react";
import {Subject} from "types/subject";
import Search, {ISearch} from "components/inputs/Search";
import {useTranslation} from "react-i18next";
import {generatePath} from "react-router";
import {Box, Card, CardContent, List, Typography} from "@material-ui/core";
import {TransparentLink} from "components";

export interface ISubjectList {
    data: Subject[];

    isFetching: boolean;
    onSearch: ISearch["onSearch"];

    onSearchValueChange: ISearch["onChange"];
    searchValue: ISearch["value"];
}

const SubjectList = ({data, isFetching, onSearch, onSearchValueChange, searchValue}: ISubjectList) => {
    const {t} = useTranslation();

    const renderElement = useCallback((element: Subject) => {
        const url = generatePath("/subject/:id", {
            id: element.id,
        });

        return (
            <Box mb={2}>
                <TransparentLink to={url}>
                    <Card>
                        <CardContent>
                            <Typography component="h1" variant="h5">
                                {element.name}
                            </Typography>
                            <Typography color="textSecondary">
                                {element.shortName}
                            </Typography>
                        </CardContent>
                    </Card>
                </TransparentLink>
            </Box>);
    }, []);

    return (
        <>
            <Search
                isLoading={isFetching}
                searchPlaceholder={t("Suche nach Fächern")}
                value={searchValue}
                onSearch={onSearch}
                onChange={onSearchValueChange}
            />
            <List style={{width: "100%"}}>
                {data.map(data => renderElement(data))}
            </List>
        </>
    );
};

export default memo(SubjectList);
