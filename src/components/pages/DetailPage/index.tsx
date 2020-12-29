/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import Form, {IForm} from "./Form";

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

export interface IDetailPage<
    AvailableKeys extends string,
    FormikForm extends Record<AvailableKeys, any> = Record<AvailableKeys, any>,
    QueryType = any,
    RelationKeys extends string = string
> {
    title: ITitle["title"];
    color: ITitle["color"];

    defaultOrdering: IForm<AvailableKeys, FormikForm>["ordering"];
    data: IForm<AvailableKeys, FormikForm>["data"];

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


const DetailPage = <
    AvailableKeys extends string,
    FormikForm extends Record<AvailableKeys, any> = Record<AvailableKeys, any>,
    QueryType = any,
    RelationKeys extends string = string
>({
        title,
        color,
        data,
        defaultOrdering,
        orderingStorageName,
        updatedAt,
        refetch,
        isRefreshing,
        bottomNode,
        footerNode,
        headerNode,
        buttons,
        addPath,
        searchAllPath,
        relation,
        subTitle,
    }: IDetailPage<AvailableKeys, FormikForm, QueryType, RelationKeys>) => {
    const {t} = useTranslation();
    const [enableReordering, setEnableReordering] = useState<boolean>(false);
    const [elevatedKey, setElevatedKey] = useState<AvailableKeys | null>(null);
    const [ordering, setOrdering] = usePersistentStorage<AvailableKeys[]>(defaultOrdering, orderingStorageName, StorageType.Local);

    const initialValues = Object
        .entries(data)
        .reduce((object, [key, value]) => ({
            ...object,
            // @ts-ignore
            [key]: value.nativeValue,
        }), {});

    // If `defaultOrdering's elements !== savedOrdering's elements`, reset it.
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
                        <Form
                            // @ts-ignore
                            initialValues={initialValues}
                            data={data}
                            ordering={ordering}
                            elevatedKey={elevatedKey}
                            reorder={enableReordering}
                            onSubmit={() => {
                                // eslint-disable-next-line no-console
                                console.log("cälld");
                            }}
                            onOrderingChange={setOrdering}
                            onElevatedKeyChange={setElevatedKey}
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
