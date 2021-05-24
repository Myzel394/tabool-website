/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {ReactNode, useCallback, useEffect, useMemo, useState} from "react";
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
import {Dayjs} from "dayjs";
import {PullToRefresh, UpdatedAt} from "components";
import {MdAdd, MdSearch} from "react-icons/all";
import _ from "lodash";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {addDetailPageOrdering, RootState} from "state";

import Title, {TitleProps} from "./Title";
import Form, {IForm} from "./Form";
import ToggleButtonsForm, {IToggleButtonsForm} from "./ToggleButtonsForm";

export interface IDetailPage<AvailableKeys extends string,
    FormikForm extends Record<string, any> = Record<AvailableKeys, any>,
    QueryType = any,
    RelationKeys extends string = string,
    RelationForm extends Record<string, any> = Record<RelationKeys, any>,
    > {
    title: TitleProps["title"];
    color: TitleProps["color"];

    defaultOrdering: IForm<AvailableKeys, FormikForm>["ordering"];
    data: IForm<AvailableKeys, FormikForm>["data"];

    orderingStorageName: string;
    onRefetch: () => Promise<any>;
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
    subTitle?: TitleProps["subTitle"];

    validationSchema?: IForm<AvailableKeys, FormikForm>["validationSchema"];
    onSubmit?: IForm<AvailableKeys, FormikForm>["onSubmit"];
    onDelete?: () => Promise<any>;
}

const fullWidth = {
    width: "100%",
};

const DetailPage = <AvailableKeys extends string,
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
        onRefetch,
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
    const ordering = useSelector<RootState>(
        state => state.preferences?.detailPage?.ordering?.[orderingStorageName] ?? [],
        shallowEqual,
    ) as AvailableKeys[];
    const dispatch = useDispatch();

    const [disableAnimation, setDisableAnimation] = useState<boolean>(false);
    const [enableReordering, setEnableReordering] = useState<boolean>(false);
    const [elevatedKey, setElevatedKey] = useState<AvailableKeys | null>(null);

    const initialValues = useMemo(() => Object
        .entries(data)
        .reduce((object, [key, value]) => ({
            ...object,
            // @ts-ignore
            [key]: value.nativeValue ?? value.information,
        }), {})
    , [data]);

    const setOrdering = useCallback(ordering => {
        if (!disableAnimation) {
            setDisableAnimation(true);
        }

        dispatch(addDetailPageOrdering({
            identifier: orderingStorageName,
            ordering,
        }));
    },
    [dispatch, orderingStorageName, disableAnimation]);

    // If `defaultOrdering's elements !== savedOrdering's elements`, reset it.
    useEffect(() => {
        if (!_.isEqual(new Set(ordering), new Set(defaultOrdering))) {
            setOrdering(defaultOrdering);
        }
    }, [defaultOrdering, ordering, setOrdering]);

    return (
        <PullToRefresh isRefreshing={isRefreshing} onRefresh={onRefetch}>
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
                            disableAnimation={disableAnimation}
                            onSubmit={onSubmit}
                            onOrderingChange={setOrdering}
                            onElevatedKeyChange={setElevatedKey}
                            onDelete={onDelete}
                        />
                    </Grid>
                    {relationButtons && (
                        <Grid item>
                            <ToggleButtonsForm<RelationKeys>
                                values={relationButtons.values}
                                onSubmit={relationButtons.onSubmit}
                            />
                        </Grid>
                    )}
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
                            <Grid item style={fullWidth}>
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
                                    <Link
                                        component={Button}
                                        href={searchAllPath}
                                        endIcon={<MdSearch />}
                                        underline="none"
                                    >
                                        {t("Suchen")}
                                    </Link>
                                )}
                                {addPath && (
                                    <Link
                                        component={Button}
                                        href={addPath}
                                        endIcon={<MdAdd />}
                                        underline="none"
                                    >
                                        {t("Hinzufügen")}
                                    </Link>
                                )}
                            </ButtonGroup>
                        </Grid>
                    )}
                    {footerNode && (
                        <Grid item>
                            {footerNode}
                        </Grid>
                    )}
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

DetailPage.whyDidYouRender = true;

export default DetailPage;
