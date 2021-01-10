/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {ReactNode, useEffect, useState} from "react";
import {
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
import {PullToRefresh, UpdatedAt} from "components";
import _ from "lodash";
import {StorageType} from "hooks/usePersistentStorage";
import {ButtonProps} from "@material-ui/core/Button";
import {MdAdd, MdSearch} from "react-icons/all";

import Title, {ITitle} from "./Title";
import Form, {IForm} from "./Form";
import ToggleButtonsForm, {IToggleButtonsForm} from "./ToggleButtonsForm";

interface IButton extends ButtonProps {
    title: string;
}

export interface IDetailPage<
    AvailableKeys extends string,
    FormikForm extends Record<string, any> = Record<AvailableKeys, any>,
    QueryType = any,
    RelationKeys extends string = string,
    RelationForm extends Record<string, any> = Record<RelationKeys, any>,
> {
    title: ITitle["title"];
    color: ITitle["color"];

    defaultOrdering: IForm<AvailableKeys, FormikForm>["ordering"];
    data: IForm<AvailableKeys, FormikForm>["data"];

    orderingStorageName: string;
    refetch: () => Promise<any>;
    isRefreshing: boolean;

    renderTopField: (reorderLabel: JSX.Element) => JSX.Element;

    updatedAt?: Dayjs;
    headerNode?: ReactNode;
    bottomNode?: ReactNode | ReactNode[];
    footerNode?: ReactNode;
    relationButtons?: {
        values: IToggleButtonsForm<RelationKeys>["values"];
        onSubmit: IToggleButtonsForm<RelationKeys>["onSubmit"];
    };

    searchAllPath?: string;
    addPath?: string;
    subTitle?: ITitle["subTitle"];

    validationSchema?: IForm<AvailableKeys, FormikForm>["validationSchema"];
    onSubmit?: IForm<AvailableKeys, FormikForm>["onSubmit"];
    onDelete?: () => Promise<any>;
}

const STORAGE_METHOD = localStorage;

const fullWidth = {
    width: "100%",
};


const DetailPage = <
    AvailableKeys extends string,
    RelationKeys extends string = string,
    QueryType = any,
    FormikForm extends Record<string, any> = Record<AvailableKeys, any>,
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
        renderTopField,
        addPath,
        searchAllPath,
        relationButtons,
        subTitle,
        onSubmit,
        validationSchema,
        onDelete,
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
            [key]: value.nativeValue ?? value.information,
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
                        <Grid container spacing={1} alignItems="center" justify="center" direction="row">
                            {renderTopField(
                                <FormControlLabel
                                    control={(
                                        <Switch
                                            value={enableReordering}
                                            onChange={event => setEnableReordering(event.target.checked)}
                                        />
                                    )}
                                    label={t("Elemente neu anordnen")}
                                />,
                            )}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Form
                            // @ts-ignore
                            initialValues={initialValues}
                            data={data}
                            ordering={ordering}
                            elevatedKey={elevatedKey}
                            reorder={enableReordering}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            onOrderingChange={setOrdering}
                            onElevatedKeyChange={setElevatedKey}
                            onDelete={onDelete}
                        />
                    </Grid>
                    {relationButtons &&
                        <Grid item>
                            <ToggleButtonsForm<RelationKeys>
                                values={relationButtons.values}
                                onSubmit={relationButtons.onSubmit}
                            />
                        </Grid>
                    }
                    {(() => {
                        if (Array.isArray(bottomNode)) {
                            return (
                                <>
                                    {bottomNode.map(node =>
                                        // @ts-ignore: If array given, nodes do have keys set
                                        <Grid key={node.key} item style={fullWidth}>
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

DetailPage.defaultProps = {
    renderTopField(reorderElement) {
        return (
            <Grid item>
                {reorderElement}
            </Grid>
        );
    },
};

export default DetailPage;
