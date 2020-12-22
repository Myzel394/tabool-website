import React, {ReactNode, useEffect, useState} from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    Link,
    Switch,
    Typography,
} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {usePersistentStorage} from "hooks";
import {Dayjs} from "dayjs";
import {LoadingOverlay, PullToRefresh, UpdatedAt} from "components";
import _ from "lodash";
import {StorageType} from "hooks/usePersistentStorage";
import {ButtonProps} from "@material-ui/core/Button";
import {MdAdd, MdSearch} from "react-icons/all";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";

import * as changeRelation from "./changeRelation";
import Title, {ITitle} from "./Title";
import InformationList, {IInformationList} from "./InformationList";

interface IButton extends ButtonProps {
    title: string;
}

interface RelationButtonType<RelationKeys extends string = string> {
    value: RelationKeys;
    title: string;
    icon: ReactNode;
}

type RelationBooleanType<RelationKeys extends string = string> = {
    [key in RelationKeys]: boolean;
};

export interface IDetailPage<AvailableKeys extends string = string, QueryType = any, RelationKeys extends string = string> {
    title: ITitle["title"];
    color: ITitle["color"];

    defaultOrdering: IInformationList<AvailableKeys>["ordering"];
    data: IInformationList<AvailableKeys>["data"];
    forceEdit?: IInformationList<AvailableKeys>["forceEdit"];
    errors?: IInformationList["errors"];

    orderingStorageName: string;
    refetch: () => Promise<any>;
    isRefreshing: boolean;

    updatedAt?: Dayjs;
    headerNode?: ReactNode;
    bottomNode?: ReactNode | ReactNode[];
    footerNode?: ReactNode;
    buttons?: IButton[];
    relation?: {
        isUpdating: boolean;
        value: RelationBooleanType<RelationKeys>;
        onChange: (newRelation: RelationBooleanType<RelationKeys>) => any;
        buttons: RelationButtonType<RelationKeys>[];
    };

    searchAllPath?: string;
    addPath?: string;
    subTitle?: ITitle["subTitle"];
}

const STORAGE_METHOD = localStorage;


const DetailPage = <AvailableKeys extends string = string, QueryType = any, RelationKeys extends string = string>({
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
    addPath,
    searchAllPath,
    relation,
    subTitle,
}: IDetailPage<AvailableKeys, QueryType, RelationKeys>) => {
    const {t} = useTranslation();
    const [enableReordering, setEnableReordering] = useState<boolean>(false);
    const [elevatedKey, setElevatedKey] = useState<string | null>(null);
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
            <Title title={title} color={color} subTitle={subTitle} />
            <Container maxWidth="md" onTouchStart={event => event.stopPropagation()}>
                {headerNode}
                <Grid container spacing={4} alignItems="center" justify="center" direction="column">
                    <Grid item>
                        <FormControlLabel
                            control={(
                                <Switch
                                    value={enableReordering}
                                    onChange={event => setEnableReordering(event.target.checked)}
                                />
                            )}
                            label={t("Elemente neu anordnen")}
                        />
                    </Grid>
                    {buttons &&
                        <Grid item>
                            <ButtonGroup variant="outlined" orientation="vertical">
                                {buttons.map(({title, ...other}) => (
                                    <Button key={title} {...other}>
                                        {title}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Grid>
                    }
                    <Grid item>
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
                    </Grid>
                    {relation &&
                        <Grid item>
                            <LoadingOverlay isLoading={relation.isUpdating}>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <ToggleButtonGroup
                                        size="large"
                                        value={changeRelation.toArray(relation.value)}
                                        onChange={(event, newRelation: any) =>
                                            relation.onChange(
                                                changeRelation.toObject(
                                                    newRelation,
                                                    relation.buttons.map(button => button.value),
                                                ),
                                            )
                                        }
                                    >
                                        {relation.buttons.map(button =>
                                            <ToggleButton
                                                key={button.value}
                                                value={button.value}
                                            >
                                                {button.icon}
                                                {button.title}
                                            </ToggleButton>)}
                                    </ToggleButtonGroup>
                                </Box>
                            </LoadingOverlay>
                        </Grid>
                    }
                    {(() => {
                        if (Array.isArray(bottomNode)) {
                            return (
                                <>
                                    {bottomNode.map(node =>
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore: If array given, nodes do have keys set
                                        <Grid key={node.key} item>
                                            {node}
                                        </Grid>)}
                                </>
                            );
                        }
                        return (
                            <Grid item>
                                {bottomNode}
                            </Grid>
                        );
                    })()}
                    <Divider />
                    <Grid item>
                        {updatedAt && <UpdatedAt value={updatedAt} />}
                        <Typography variant="body2">
                            {t("Tipp: Ziehe den Titel ganz runter um neuzuladen.")}
                        </Typography>
                    </Grid>
                    {(searchAllPath || addPath) && (
                        <Grid item>
                            <ButtonGroup orientation="vertical" color="primary">
                                {searchAllPath && (
                                    <Link component={Button} href={searchAllPath} endIcon={<MdSearch />}>
                                        {t("Suchen")}
                                    </Link>
                                )}
                                {addPath && (
                                    <Link component={Button} href={addPath} endIcon={<MdAdd />}>
                                        {t("Hinzufügen")}
                                    </Link>
                                )}
                            </ButtonGroup>
                        </Grid>
                    )}
                    {footerNode &&
                        <Grid item>
                            {footerNode}
                        </Grid>
                    }
                </Grid>
            </Container>
        </PullToRefresh>
    );
};

export default DetailPage;
