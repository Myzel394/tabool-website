import React, {ReactNode, useEffect, useState} from "react";
import {Box, Button, ButtonGroup, Container, FormControlLabel, Switch, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {usePersistentStorage} from "hooks";
import {Dayjs} from "dayjs";
import {QueryResult} from "react-query";
import {PullToRefresh, UpdatedAt} from "components";
import _ from "lodash";
import {StorageType} from "hooks/usePersistentStorage";
import {ButtonProps} from "@material-ui/core/Button";

import Title, {ITitle} from "./Title";
import InformationList, {IInformationList} from "./InformationList";

interface IButton extends ButtonProps {
    title: string;
}

export interface IDetailPage<D = any> {
    title: ITitle["title"];
    color: ITitle["color"];

    defaultOrdering: IInformationList["ordering"];
    data: IInformationList["data"];
    forceEdit?: IInformationList["forceEdit"];
    errors?: IInformationList["errors"];

    orderingStorageName: string;
    refetch: QueryResult<D>["refetch"];
    isRefreshing: boolean;

    updatedAt?: Dayjs;
    headerNode?: ReactNode;
    bottomNode?: ReactNode;
    footerNode?: ReactNode;
    buttons?: IButton[];
}

const STORAGE_METHOD = localStorage;

const DetailPage = ({
    title,
    color,
    data,
    defaultOrdering,
    orderingStorageName,
    updatedAt,
    refetch,
    isRefreshing,
    forceEdit,
    errors,
    bottomNode,
    footerNode,
    headerNode,
    buttons,
}: IDetailPage) => {
    const {t} = useTranslation();
    const [enableReordering, setEnableReordering] = useState<boolean>(false);
    const [elevatedKey, setElevatedKey] = useState<string>("");
    const [ordering, setOrdering] = usePersistentStorage<string[]>(defaultOrdering, orderingStorageName, StorageType.Local);

    // If `defaultOrdering` changes and the locally saved ordering doesn't contain the new ordering, reset it.
    useEffect(() => {
        if (!_.isEqual(new Set(ordering), new Set(defaultOrdering))) {
            STORAGE_METHOD.removeItem(orderingStorageName);
            setOrdering(defaultOrdering);
        }
    }, [defaultOrdering, ordering, orderingStorageName, setOrdering]);


    return (
        <PullToRefresh isRefreshing={isRefreshing} onRefresh={refetch}>
            <Title title={title} color={color} />
            {headerNode}
            <Container maxWidth="md" onTouchStart={event => event.stopPropagation()}>
                <Box display="flex" alignItems="center" flexDirection="column">
                    <FormControlLabel
                        control={(
                            <Switch
                                value={enableReordering}
                                onChange={event => setEnableReordering(event.target.checked)}

                            />
                        )}
                        label={t("Elemente neu anordnen")}
                    />
                    {buttons && (
                        <ButtonGroup variant="outlined" orientation="vertical">
                            {buttons.map(({title, ...other}) => (
                                <Button key={title} {...other}>
                                    {title}
                                </Button>
                            ))}
                        </ButtonGroup>
                    )}
                    <Box py={3}>
                        <InformationList
                            elevatedKey={elevatedKey}
                            ordering={ordering}
                            forceEdit={forceEdit}
                            data={data}
                            errors={errors}
                            setElevatedKey={setElevatedKey}
                            setOrdering={setOrdering}
                            reorder={enableReordering}
                        />
                    </Box>
                    {bottomNode}
                    <Box my={2}>
                        {updatedAt && <UpdatedAt value={updatedAt} />}
                        <Typography variant="body2">
                            {t("Tipp: Ziehe den Titel ganz runter um neuzuladen.")}
                        </Typography>
                    </Box>
                    {footerNode}
                </Box>
            </Container>
        </PullToRefresh>
    );
};

export default DetailPage;
