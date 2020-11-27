import React, {useState} from "react";
import {Box, Container, FormControlLabel, Switch} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {usePersistentStorage} from "hooks";

import Title, {ITitle} from "./Title";
import {IInformation} from "./Information";
import InformationList from "./InformationList";
import DetailContext, {IDetailContext} from "./DetailContext";

export interface Data {
    information: IInformation["information"];
    title: IInformation["title"];
    icon: IInformation["icon"];
}

export interface IDetailPage {
    title: ITitle["title"];
    color: ITitle["color"];
    defaultOrdering: IDetailContext["ordering"];
    orderingStorageName: string;
    data: IDetailContext["data"];
}

const DetailPage = ({title, color, data, defaultOrdering, orderingStorageName}: IDetailPage) => {
    const {t} = useTranslation();
    const [enableReordering, setEnableReordering] = useState<boolean>(false);
    const [elevatedKey, setElevatedKey] = useState<string | undefined>();
    const [ordering, setOrdering] = usePersistentStorage<string[]>(defaultOrdering, orderingStorageName);

    return (
        <DetailContext.Provider
            value={{
                elevatedKey,
                enableReordering,
                ordering,
                setElevatedKey,
                setEnableReordering,
                setOrdering,
                data,
            }}
        >
            <Title title={title} color={color} />
            <Box px={2} py={4}>
                <Container maxWidth="md">
                    <FormControlLabel
                        control={(
                            <Switch
                                value={enableReordering}
                                onChange={event => setEnableReordering(event.target.checked)}
                            />
                        )}
                        label={t("Elemente neu anordnen")}
                    />
                    <InformationList />
                </Container>
            </Box>
        </DetailContext.Provider>
    );
};

export default DetailPage;
