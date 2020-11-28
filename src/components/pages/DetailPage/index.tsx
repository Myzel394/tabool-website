import React, {useState} from "react";
import {Box, Container, FormControlLabel, Switch} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {usePersistentStorage} from "hooks";
import {Dayjs} from "dayjs";
import {QueryResult} from "react-query";
import {PullToRefresh, UpdatedAt} from "components";

import {IPullToRefresh} from "../../PullToRefresh";

import Title, {ITitle} from "./Title";
import {IInformation} from "./Information";
import DetailContext, {IDetailContext} from "./DetailContext";
import InformationList from "./InformationList";

export interface Data {
    information: IInformation["information"];
    title: IInformation["title"];
    icon: IInformation["icon"];
}

export interface IDetailPage<D = any> {
    title: ITitle["title"];
    color: ITitle["color"];

    defaultOrdering: IDetailContext["ordering"];
    orderingStorageName: string;
    data: IDetailContext["data"];
    refetch: QueryResult<D>["refetch"];
    isRefreshing: IPullToRefresh["isRefreshing"];

    forms?: IDetailContext["forms"];
    updatedAt?: Dayjs;
    forceEdit?: IDetailContext["forceEdit"];
}

const DetailPage = ({
    title,
    color,
    data,
    defaultOrdering,
    orderingStorageName,
    forms,
    updatedAt,
    refetch,
    isRefreshing,
    forceEdit,
}: IDetailPage) => {
    const {t} = useTranslation();
    const [enableReordering, setEnableReordering] = useState<boolean>(false);
    const [elevatedKey, setElevatedKey] = useState<string | undefined>();
    const [ordering, setOrdering] = usePersistentStorage<string[]>(defaultOrdering, orderingStorageName);

    return (
        <PullToRefresh isRefreshing={isRefreshing} onRefresh={refetch}>
            <div>
                <Title title={title} color={color} />
                <Container maxWidth="md">
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
                        <Box py={3}>
                            <DetailContext.Provider
                                value={{
                                    elevatedKey,
                                    enableReordering,
                                    ordering,
                                    setElevatedKey,
                                    setEnableReordering,
                                    setOrdering,
                                    data,
                                    forms,
                                    forceEdit,
                                }}
                            >
                                <InformationList />
                            </DetailContext.Provider>
                        </Box>
                        {updatedAt && <UpdatedAt value={updatedAt} />}
                    </Box>
                </Container>
            </div>
        </PullToRefresh>
    );
};

export default DetailPage;
